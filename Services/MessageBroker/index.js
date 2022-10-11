const express = require("express");
const cors = require("cors");
require("dotenv/config");

const { createSqlConnection } = require("../BatchLayer/model/mySql");
const simulatorController = require("./controller/simulator.controller");

const app = express.urlencoded({ extended: false });

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Routes */
app
  .get("/", (req, res) => res.send("Hello World!"))

  .post("/api/insertPurchase", simulatorController.sendMessage)
  .post("/api/startSimulator", controller.startSimulator)
  .post("/api/stopSimulator", controller.stopSimulator)
  .get("/api/simulatorStatus", controller.getSimulatorStatus)
  .post("/api/simulatorRate", controller.setSimulatorRate);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Messege Broker listening at http://localhost:${PORT}`);
});

createSqlConnection();
