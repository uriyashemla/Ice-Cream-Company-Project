const mysql = require("mysql");
const mySqlConfig = require("../../config/mySql.config");
let connection;

const createSqlConnection = () => {
  return new Promise((resolve, reject) => {
    connection = mysql.createConnection(mySqlConfig);
    connection.connect((err) => {
      if (err) return reject(err);

      console.log("sql is connected");
      return resolve();
    });
  });
};

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) return reject({ error });
      return resolve(results);
    });
  });
};

const getCityByName = (cityName) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM storesdb.stores_info WHERE cityName = '${cityName}';`;
    connection.query(query, (error, results, fields) => {
      if (error) return reject({ error });
      return resolve(results[0]);
    });
  });
};

const getCityById = (id) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT cityName FROM storesdb.stores_info WHERE id = ${id};`;
    connection.query(query, (error, results, fields) => {
      if (error) return reject({ error });
      return resolve(results[0].cityName);
    });
  });
};

const getAllCities = () => {
  return new Promise((resolve, reject) => {
    let query = `SELECT cityName FROM storesdb.stores_info;`;
    connection.query(query, (error, results, fields) => {
      if (error) return reject({ error });
      return resolve(results);
    });
  });
}

module.exports = { createSqlConnection, executeQuery, getCityByName, getCityById,getAllCities };
