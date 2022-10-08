const mySql = require("../../api/mySql");
var InitStores = require("./InitStores");

(async() =>{
  try {
    await mySql.createSqlConnection();
    let stores = await InitStores();
    stores.forEach(async (element) => {
      var sql = `INSERT INTO stores_info (id, cityName, cityType, ownerName, toddlers, kids, adolescent, adults, middleAge, seniors) VALUES ('${
        element.id
      }' , '${element.cityName
        .trim()
        .replace("'", "")}', '${element.cityType.trim()}', '${element.ownerName
        .trim()
        .replace("'", "")}', '${element.toddlers}', '${element.kids}', '${
        element.adolescent
      }', '${element.adults}', '${element.middleAge}', '${element.seniors}')`;
      try {
        await mySql.executeQuery(sql);
        console.log("push row to the table");
      } catch (error) {
        return console.log(error);
      }
    });
  } catch (error) {
    return console.log(error);
  }
})();