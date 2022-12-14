import React, { useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import SelectList from "../SelectList/SelectList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPrediction, getCityInfo } from "../../api/batchLayer";

export default ({ cities, tastes }) => {
  const [startDate, setStartDate] = useState(new Date());

  const [prdictionRequest, setPredictionRequest] = useState({
    date: new Date(),
  });
  const [predictionData, setPredictionData] = useState(null);
  const [cityData, setCityData] = useState(null);

  return (
    <div
      style={{
        backgroundColor: "rgba(94,29,84,0.85)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "63vh",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop:"120px"
        }}
      >
        <label>
          Select Store:
          <SelectList
            data={cities}
            callback={(cb) =>{
              setPredictionRequest({ ...prdictionRequest, cityName: cb.value });
              setPredictionData(null);}
            }
          />
        </label>

        <label>
          Select Taste:
          <SelectList
            data={tastes}
            callback={(cb) =>{
              setPredictionRequest({ ...prdictionRequest, taste: cb.value });
              setPredictionData(null);
            }}
          />
        </label>

        <div>
          <label>
          Select Date:
          </label>
          <br />
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setPredictionData(null);
              setStartDate(date);
              setPredictionRequest({ ...prdictionRequest, date });
            }}
          />
        </div>

        <button
          style={{ borderRadius: "5px" }}
          onClick={() => {
            getPrediction(prdictionRequest)
              .then(setPredictionData)
              .catch(() => {});
            getCityInfo(prdictionRequest)
              .then(setCityData)
              .catch(() => {});
          }}
        >
          Predict Purchase
        </button>
      </div>
      {predictionData ? (
        <h2>
          <br/>
          ???? ??????: {prdictionRequest.cityName}
          <br/>
          ?????? ?????????????????? ????????: {cityData.cityType} 
          <br/>
          ???????? ?????????????????? ?????? - ????????????: {(Math.floor(cityData.toddlers * 100)) + 1}%, ??????????: {Math.floor(cityData.kids * 100)}%, ????????????: {Math.floor(cityData.adolescent * 100)}%,
           ??????????????: {Math.floor(cityData.adults * 100)}%, ??????????: {Math.floor(cityData.middleAge * 100)}%, ??????: {Math.floor(cityData.seniors * 100)}%
          <br/>
          ????????????: {new Date(prdictionRequest.date).toLocaleDateString("en-ca")} ????????: {cityData.season}, ?????? ????????????: {cityData.weather},  ????: {cityData.holiday}
          <br/>
          ?????????? ?????????? ???????? {cityData.taste} ?????? {predictionData} ??"??
        </h2>
      ) : (
        <></>
      )}
    </div>
  );
};
