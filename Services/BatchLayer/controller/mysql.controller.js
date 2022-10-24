const { getAllCities, getCityByName } = require("../model/mySql");
const parseSeason = require("../utils/parseSeason");
const getHoliday = require("../webServices/getHoliday");
const getWeather = require("../webServices/getWeather");
const parseCityType = require("../utils/parseCityType")
const parseHoliday = require("../utils/parseHoliday");
const parseTaste = require("../utils/parseTaste");

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

const getCityInfo = async (req,res) => {
  try{
    let {date,cityName,taste} = req.params
    let { cityType, toddlers, kids, adolescent, adults, middleAge, seniors } = await getCityByName(cityName);
    
    let obj = {
      taste: parseTaste(taste),
      cityType: parseCityType(cityType),
      toddlers,
      kids,
      adolescent,
      adults,
      middleAge,
      seniors,
      season: parseSeason(date),
      holiday: parseHoliday(await getHoliday(date)),
      weather: getWeather(date),
    };
    console.log(obj);
    res.status(200).send(obj);
  }
  catch(error){
    console.log(error);
    res.status(400).send("error fetching data");
  }
};

module.exports = {getCitiesList, getCityInfo}