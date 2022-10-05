var mysql      = require('mysql');
var InitStores =  require("./InitStores");;
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'storesdb',
  user     : 'root',
  password : 'root'
});

connection.connect(async function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
   console.log('connected as id ' + connection.threadId);

  try{
    let stores = await InitStores()
    stores.forEach((element)=>{
      var sql = `INSERT INTO stores_info (id, cityName, cityType, toddlers, kids, adolescent, adults, middleAge, seniors) VALUES ('${element.id}' , '${element.name.trim().replace('\'','')}', '${element.cityType.trim()}', '${element.toddlers}', '${element.kids}', '${element.adolescent}', '${element.adults}', '${element.middleAge}', '${element.seniors}')`;


      connection.query(sql, function(err) {
          if (err) throw err;
          console.log("push");
      });
    })
    }catch(error){
    console.error(error)
    }


  
  
});