const mySql = require("../../BatchLayer/model/mySql");
const redis = require("../model/redis");

let sql = `SELECT cityName FROM storesdb.stores_info;`;

const obj = {
  Chocolate: 10000,
  Vanilla: 10000,
  Strawberry: 10000,
  Lemon: 10000,
  Halva: 10000,
};

mySql.createSqlConnection().then(() => {
  redis.createRedisConnection().then(async () => {
    let exist;
    try {
      exist = await redis.exist("אשדוד");
  
    } catch (err) {
      return console.log(err);
    }
    if (exist) {
      console.log("db already exist");
    } else {
      mySql
        .executeQuery(sql)
        .then((res) => {
          res.forEach(async (store) => {
            try {
              await redis.set(`${store.cityName}`, JSON.stringify(obj));
              console.log("succes push to redis");
            } catch (err) {
              return console.log(err);
            }
          });
        })
        .catch(console.log);

    }
  });
});