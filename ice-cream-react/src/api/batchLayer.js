import axios from "axios";

const URL = "http://localhost:3003";
export const getAllCities = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/api/getCitiesList`)
      .then((result) => {
        resolve(result.data);
      })
      .catch(reject);
  });
};
export const getWeekPrediction = (cityName, taste) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/api/predictWeekPurchases/${cityName}/${taste}`)
      .then((result) => {
        resolve(result.data);
      })
      .catch(reject);
  });
};
export const getPrediction = ({ date, cityName, taste }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/api/predictPurchase/${date}/${cityName}/${taste}`)
      .then((result) => {
        resolve(result.data);
      })
      .catch(reject);
  });
};

export const getCityInfo = ({ date, cityName, taste }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/api/getCityInfo/${date}/${cityName}/${taste}`)
      .then((result) => {
        resolve(result.data);
      })
      .catch(reject);
  });
};
