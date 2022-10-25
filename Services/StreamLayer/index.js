const express = require("express");
const cors = require("cors");
require("dotenv").config();
const controller = require("./controller/StreamLayer.Controller");
const kafkaConsumer = require("./model/Kafka");
const db = require("./model/redis");
const { createSqlConnection } = require("../BatchLayer/model/mySql");

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

app
  .get("/", (req, res) => {
    res.send("Hello World!");
  })
  /* Routes */

  .put("/api/reduceInventory", controller.reduceInventory)
  .put("/api/addInventory", controller.addInventory)
  .get("/api/getStoreInventory/:cityName", controller.getStoreInventory)
  .get("/api/getAllInventory", controller.getAllInventory)
  .get("/api/getTastes", controller.getTastes);


kafkaConsumer.on("data", async (message) => {
  console.log("got data");
  const buffer = Buffer.from(message.value);
  const bufferObject = JSON.parse(buffer.toString());

  let { cityName, taste, quantity, date } = bufferObject;
  try {
    db.reduceInventory(cityName,taste,quantity);    
  } catch (error) {
    console.log(error);
  }
});

/* Start server */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
  console.log(`StreamLayer listening at http://localhost:${PORT}`)
);

const startConnetions = async () => {
  try {
    await createSqlConnection();
    await db.createRedisConnection();
  } catch (error) {}
};

startConnetions();
