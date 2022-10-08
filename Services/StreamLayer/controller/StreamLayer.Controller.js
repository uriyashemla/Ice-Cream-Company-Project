const db = require("../../api/redis");

const reduceInventory = async (req, res) => {
  const { cityName = "אשדוד", taste = "Halva", quantity = 6 } = req.body;
  await db.createRedisConnection();
  const value = await db.get(cityName);
  value[taste] -= quantity;
  db.set(cityName, JSON.stringify(value));
};


const addInventory = async (req, res) => {
  await db.createRedisConnection();
  const value = await db.get(cityName);
  value[taste] += quantity;
  db.set(cityName, JSON.stringify(value));
};

module.exports = {
  reduceInventory,
  addInventory,
};

updateInventory();
