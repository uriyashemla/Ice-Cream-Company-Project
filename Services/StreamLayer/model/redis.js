const redis = require("redis");
let publisher;

const createRedisConnection = () => {
  return new Promise((resolve, reject) => {
    if (publisher) return resolve();

    publisher = redis.createClient();
    publisher.connect();
    publisher.on("connect", () => {
      console.log("redis is connected");
      return resolve();
    });
    publisher.on("error", () => {
      console.log("redis connection error");
      return reject();
    });
  });
};

const flushRedisDB = () => {
  publisher.flushAll();
  console.log("redis flushed");
};

const exist = (cityName) => {
  return publisher.exists(cityName);
};

const set = (cityName, value) => {
  return new Promise((resolve, reject) => {
    publisher
      .set(cityName, value)
      .then((res) => {
        return resolve (res)
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const get = (cityName) => {
  return new Promise((resolve, reject) => {
    publisher
      .get(cityName)
      .then((res) => {
        return resolve(JSON.parse(res));
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const reduceInventory = (cityName, taste, quantity) => {
  return new Promise(async (resolve, reject) => {
    await get(cityName)
      .then(async (res) => {
        res[taste] -= +quantity;
        await set(cityName, JSON.stringify(res));
        console.log(res);
        console.log("Inventory updated");
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = {
  createRedisConnection,
  flushRedisDB,
  exist,
  set,
  get,
  reduceInventory,
};
