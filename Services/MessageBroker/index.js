const express = require("express");
const cors = require("cors");
require("dotenv/config");

const { createSqlConnection } = require("../BatchLayer/model/mySql");
const simulatorController = require("./controller/simulator.controller");

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Routes */
app
  .get("/", (req, res) => res.send("Hello World!"))

  .post("/api/insertPurchase", simulatorController.sendMessage)
  .post("/api/startSimulator", simulatorController.startSimulator)
  .post("/api/stopSimulator", simulatorController.stopSimulator)
  .get("/api/simulatorStatus", simulatorController.getSimulatorStatus)
  .post("/api/simulatorRate", simulatorController.setSimulatorRate);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Messege Broker listening at http://localhost:${PORT}`);
});

createSqlConnection();
