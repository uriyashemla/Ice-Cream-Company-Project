const mongo = require("./model/mongo");
const mongoose = require("./model/mongoose");

const express = require("express");
const cors = require("cors");

const mongoController = require("./controller/mongo.controller");
const mySql = require("./model/mySql");
const kafkaConsumer = require("./model/Kafka");
const parseSeason = require("./utils/parseSeason");
const getHoliday = require("./webServices/getHoliday");
const { getCitiesList } = require("./controller/mysql.controller");
const getWeather = require("./webServices/getWeather");
const { predictPurchase } = require("./controller/prediction");

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Routes */
app
  .get("/", (req, res) => {
    res.send("Hello World!");
  })

  .post("/api/insertPurchase", mongoController.insertPurchase)
  .get("/api/getAllPurchases", mongoController.getAllPurchases)
  .delete("/api/deleteAllPurchases", mongoController.deleteAllPurchases);

app.get("/api/getCitiesList", getCitiesList);

app.post("/api/predictPurchase", predictPurchase);

/* Kafka */
kafkaConsumer.on("data", async function (message) {
  console.log("got data");
  const buffer = Buffer.from(message.value);
  const bufferObject = JSON.parse(buffer.toString());

  let { cityName, taste, quantity, date } = bufferObject;
  try {
    // let cityInfo = await mysql.getCityByName(data.cityName);
    let { cityType, toddlers, kids, adolescent, adults, middleAge, seniors } =
      await mySql.getCityByName(cityName);
    let obj = {
      taste,
      quantity,
      day: new Date(date).getDate(),
      month: new Date(date).getMonth() + 1,
      year: new Date(date).getFullYear(),
      cityName,
      cityType,
      toddlers,
      kids,
      adolescent,
      adults,
      middleAge,
      seniors,
      season: parseSeason(date),
      holiday: await getHoliday(date),
      weather: await getWeather(date),
    };

    const Purchase = new mongoose.purchaseModel(obj);
    Purchase.save()
      .then(() =>
        console.log(
          "Inserted to MongoDB:",
          JSON.stringify(Purchase).slice(0, 100)
        )
      )
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

/* Start server */
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Batch Layer listening at http://localhost:${PORT}`);
});

mongo.createMongoConnection();
mongoose.createMongooseConnection();
mySql.createSqlConnection();
