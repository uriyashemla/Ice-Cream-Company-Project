const { createMongoConnection } = require("./model/mongo");
const { createMongooseConnection } = require("./model/mongoose");

const express = require("express");
const cors = require("cors");

const mongoController = require("./controller/mongo.controller");
const { createSqlConnection } = require("./model/mySql");
// const kafkaConsumer = require("./model/Kafka");
// const PhoneCallModel = require("./model/PhoneCallModel");

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Routes */
app
  .get("/", (req, res) => res.send("Hello World!"))

  .post("/api/insertPurchase", mongoController.insertPurchase)
  .get("/api/getAllPurchases", mongoController.getAllPurchases)
  .delete("/api/deleteAllPurchases", mongoController.deleteAllPurchases)
//   .get("/api/buildModel", bigmlController.buildModel)
//   .get("/api/modelInfo", bigmlController.getModelInfo)
//   .post("/api/predictCall", bigmlController.predictCall);

/* Kafka */
// kafkaConsumer.on("data", function (message) {
//   const phoneCall = new PhoneCallModel(JSON.parse(message.value));
//   phoneCall
//     .save()
//     .then(() => console.log("Inserted to MongoDB:", JSON.stringify(phoneCall).slice(0, 100)))
//     .catch((err) => console.log(err));
// });

/* Start server */
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Batch Layer listening at http://localhost:${PORT}`);
});

createMongoConnection()
createMongooseConnection()
createSqlConnection()