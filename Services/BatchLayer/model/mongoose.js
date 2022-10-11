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

const createPurchaseModel = () => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const PurchaseSchema = new Schema({
    cityName: String,
    cityType: String,
    toddlers: Double,
    kids: Double,
    adolescent: Double,
    adults: Double,
    middleAge: Double,
    seniors: Double,
    day: String,
    month: String,
    year: String,
    season: String,
    holiday: Boolean,
    weather: String,
    taste: String,
    quantity: String,
  });
  return mongoose.model("Purchase", PurchaseSchema);
};

module.exports = {
  createMongooseConnection,
  createPurchaseModel,
};
