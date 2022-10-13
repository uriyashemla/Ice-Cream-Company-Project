const { Double } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv/config");

let mongooseConn;

const createMongooseConnection = () => {
  return new Promise(async (resolve, reject) => {
    mongoose
      .connect(`${process.env.MONGO_DB_URL}`)
      .then(() => {
        console.log("mongoose is connected");
        mongooseConn = mongoose.connection;
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

  const Schema = mongoose.Schema;

  const PurchaseSchema = new Schema({
    cityName: String,
    cityType: String,
    toddlers: String,
    kids: String,
    adolescent: String,
    adults: String,
    middleAge: String,
    seniors: String,
    day: String,
    month: String,
    year: String,
    season: String,
    holiday: Boolean,
    weather: String,
    taste: String,
    quantity: String,
  });
  const purchaseModel = mongoose.model("Sells", PurchaseSchema);

module.exports = {
  createMongooseConnection,
  purchaseModel
};
