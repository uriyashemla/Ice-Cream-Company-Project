const { getAllCities } = require("../model/mySql");

const getCitiesList = async (req, res) => {
    try {
      const data = await getAllCities();
      const arr =[]
      Object.values(data).forEach((city)=>arr.push(city.cityName))
      res.status(200).send(arr);
    } catch (error) {
      console.log(error);
      res.status(400).send("error fetching data");
    }
  };

module.exports = {getCitiesList}