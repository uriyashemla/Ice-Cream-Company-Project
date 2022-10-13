const express = require("express");
const cors = require("cors");
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);
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
    res.send("Hello World!")})
  /* Routes */

  .put("/api/reduceInventory", controller.reduceInventory)
  .put("/api/addInventory", controller.addInventory)
  .get("/api/getStoreInventory", controller.getStoreInventory)
  .get("/api/getAllInventory", controller.getAllInventory);

// io.on("connection", async (client) => {
//     console.log("Client connected to socket");
//     try {
//         let calls_data = await db.redis.json.GET("calls_data");
//         io.emit("calls", calls_data);
//         console.log("calls data:", calls_data);
//     } catch (error) {
//         console.log(error);
//     }
// });

// kafkaConsumer.on("data", async (message) => {
//     const new_Call = JSON.parse(message.value);
//     try {
//         let calls_data = await db.redis.json.GET("calls_data");
//         calls_data = processData(new_Call, calls_data);
//         await db.redis.json.SET("calls_data", "$", calls_data);
//         await db.redis.json.ARRINSERT("All_calls", "$", 0, new_Call);
//         io.emit("calls", calls_data);
//         io.emit("last_call", new_Call);
//     } catch (error) {
//         console.log(error);
//     }
// });

/* Start server */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
  console.log(`StreamLayer listening at http://localhost:${PORT}`)
);

createSqlConnection();
db.createRedisConnection();
