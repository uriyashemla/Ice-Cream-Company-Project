const DecisionTree = require("decision-tree");
const { getAllPurchases } = require("../model/mongo");
const { getCityByName } = require("../model/mySql");
const parseSeason = require("../utils/parseSeason");
const getHoliday = require("../webServices/getHoliday");
const getWeather = require("../webServices/getWeather");

const buildeModel = async () => {
  let trainingData;
  try {
    trainingData = await getAllPurchases();
  } catch (error) {
    return
  }
  const className = "quantity";
  const features = [
    "cityName",
    "cityType",
    "toddlers",
    "kids",
    "adolescent",
    "adults",
    "middleAge",
    "seniors",
    "season",
    "holiday",
    "weather",
    "taste",
  ];

  const dt = new DecisionTree(trainingData, className, features);
  return dt;
};

const predictWeekPurchases = async (req, res) => {
  const dt = await buildeModel();

  let date = new Date();
  let changingDate = new Date(date.getTime());

  let { cityName, taste } = req.params;
  let cityInfo;
  try {
    cityInfo = await getCityByName(cityName);
  } catch (error) {
    console.log("error fetching city name: " + error);
    return res.status(400).send("error fetching city name");
  }
  let { cityType, toddlers, kids, adolescent, adults, middleAge, seniors } =
    cityInfo;

  let arr = [];

  for (let i = 0; i < 7; i++) {
    changingDate.setDate(changingDate.getDate() + i);

    let obj = {
      taste,
      cityName,
      cityType,
      toddlers,
      kids,
      adolescent,
      adults,
      middleAge,
      seniors,
      season: parseSeason(changingDate),
      holiday: await getHoliday(changingDate),
      weather: getWeather(changingDate),
    };

    let predictedClass = dt.predict(obj);
    arr.push(predictedClass);
  }

  res.status(200).send(arr);
};

const predictPurchase = async (req, res) => {
  const dt = await buildeModel();

  let { cityName, taste, date } = req.params;
  let { cityType, toddlers, kids, adolescent, adults, middleAge, seniors } =
    await getCityByName(cityName);

  let theDate = new Date(date);

  let obj = {
    taste,
    cityName,
    cityType,
    toddlers,
    kids,
    adolescent,
    adults,
    middleAge,
    seniors,
    season: parseSeason(theDate),
    holiday: await getHoliday(theDate),
    weather: getWeather(theDate),
  };

  let predictedClass = dt.predict(obj);

  res.status(200).send(predictedClass);
};

module.exports = {
  predictWeekPurchases,
  predictPurchase,
};
