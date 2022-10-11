const MongoClient = require("mongodb").MongoClient;
require("dotenv/config");

const dbName = "Ice-Cream-Store", collectionName = "Sells";
let mongoConn;

const createMongoConnection = () => {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(process.env.MONGO_DB_URL);
        client.connect().then(() => {
            console.log("mongo is connected");
            mongoConn = client.db(dbName).collection(collectionName)
            return resolve();  
        }).catch((err) => {
            return reject(err)
        })
    });
  };

  const insertPurchase = (data) => {
    return mongoConn.insertOne(data);
  } 

  const getAllPurchases = () => {
    return mongoConn.find().toArray();
  }

  const deletePurchase = (purchase) => {

  }

  const deleteAllPurchases = () => {
    return mongoConn.deleteMany({});
  } 

  module.exports = {
    createMongoConnection,
    insertPurchase,
    getAllPurchases,
    deletePurchase,
    deleteAllPurchases
  }