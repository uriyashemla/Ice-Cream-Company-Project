const MongoClient = require("mongodb").MongoClient;
const jsonfile = require("jsonfile");
require("dotenv/config");

const dbName = "test",
  collectionName = "sells";
let mongoConn;

const createMongoConnection = () => {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(process.env.MONGO_DB_URL);
    client
      .connect()
      .then(() => {
        console.log("mongo is connected");
        mongoConn = client.db(dbName).collection(collectionName);
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const insertPurchase = (data) => {
  return mongoConn.insertOne(data);
};

const getAllPurchases = () => {
  return new Promise(async (resolve, reject) => {
    return resolve(mongoConn.find().limit(1500).toArray());
  });
};

const deletePurchase = (purchase) => {};

const deleteAllPurchases = () => {
  return mongoConn.deleteMany({});
};

const creatJsonFile = () => {
  return new Promise(async (resolve, reject) => {
    let purchases = await getAllPurchases();
    await jsonfile.writeFile('./purchasesData.json', purchases,{ spaces: 2 }).then(() => {
      return resolve(purchases);
    });
  });
};

module.exports = {
  createMongoConnection,
  insertPurchase,
  getAllPurchases,
  deletePurchase,
  deleteAllPurchases,
  creatJsonFile
};
