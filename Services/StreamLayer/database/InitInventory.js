const mySql = require("../../BatchLayer/model/mySql");
const redis = require("../model/redis");

let sql = `SELECT cityName FROM storesdb.stores_info;`;

const obj = {
  Chocolate: 200,
  Vanilla: 200,
  Strawberry: 200,
  Lemon: 200,
  Halva: 200,
};

mySql.createSqlConnection().then(() => {
  redis
    .createRedisConnection()
    .then(async () => {
      let exist;
      mySql.executeQuery(sql).then((res) => {
        res.forEach(async (store) => {
          try {
            exist = await redis.exist("אשדוד");
            if (exist) {
              console.log("db already exist");
            } else {
              try {
                await redis.set(`${store.cityName}`, JSON.stringify(obj));
                console.log("succes push to redis");
              } catch (err) {
                return console.log(err);
              }
            }
          } catch (err) {
            return console.log(err);
          }
        });
      });
    })
    .catch(console.log);
});
