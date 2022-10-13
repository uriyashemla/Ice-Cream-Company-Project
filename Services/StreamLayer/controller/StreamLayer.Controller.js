const db = require("../model/redis");
const mySql = require("../../BatchLayer/model/mySql");

const reduceInventory = async (req, res) => {
  const { cityName , taste , quantity } = req.body;
  console.log(quantity);
  try {
    const value = await db.get(cityName);
    value[taste] -= quantity;
    db.set(cityName, JSON.stringify(value));
    res.status(200).send("approved");
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const addInventory = async (req, res) => {
  const { cityName , taste , quantity } = req.body;
  console.log(quantity);
  try {
    const value = await db.get(cityName);
    value[taste] += +quantity;
    db.set(cityName, JSON.stringify(value));
    res.status(200).send("approved");
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const getStoreInventory = async (req, res) => {
  let { cityName} = req.body;
  try {
    const value = await db.get(cityName);
    console.log(value);
    res.status(200).send(value);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const getAllInventory = async (req, res) => {
  let stores;
  let Chocolate = 0,Vanilla = 0,Strawberry = 0,Lemon = 0,Halva = 0
  let sql = `SELECT cityName FROM storesdb.stores_info;`;
  try {
      stores = await mySql.executeQuery(sql)
      for(const store of stores){
        let element = await db.get(`${store.cityName}`);
        Chocolate += element.Chocolate;
        Vanilla += element.Vanilla;
        Strawberry += element.Strawberry;
        Lemon += element.Lemon;
        Halva += element.Halva;
      }

    const obj = {
      totalChocolate: Chocolate,
      totalVanilla: Vanilla,
      totalStrawberry: Strawberry,
      totalLemon: Lemon,
      totalHalva: Halva,
    };
    res.status(200).send(obj);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

module.exports = {
  reduceInventory,
  addInventory,
  getStoreInventory,
  getAllInventory
};