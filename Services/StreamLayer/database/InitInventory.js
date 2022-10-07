const redis = require('redis');
const publisher = redis.createClient();
const obj = {
    'Chocolate':10000, 
    'Vanilla':10000,
    'Strawberry':10000,
    'Lemon':10000,
    'Halva':10000
}
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'storesdb',
  user     : 'root',
  password : 'root'
});

var sql = `SELECT cityName FROM storesdb.stores_info;`;


publisher.on('connect', function () {
    console.log('connected');
});

publisher.connect();
// publisher.flushAll();

    

connection.connect(async function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
     console.log('connected as id ' + connection.threadId);
     const exist = await publisher.exists("אשדוד");
      if (exist) {
        console.log("db already exist");
      }
      else{
         connection.query(sql, function(err,res) {
            if (err) throw err;
            res.forEach(async (element) => {
                await publisher.set(`${element.cityName}`, JSON.stringify(obj));
            })
        });  
      }  
  });

  module.exports.publisher = publisher;
