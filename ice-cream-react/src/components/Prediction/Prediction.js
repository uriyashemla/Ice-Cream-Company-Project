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
        justifyContent: "space-evenly",
        height: "63vh",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          justifyContent: "space-evenly",
        }}
      >
        <label>
          Select Store:
          <SelectList
            data={cities}
            callback={(cb) =>
              setPredictionRequest({ ...prdictionRequest, cityName: cb.value })
            }
          />
        </label>

        <label>
          Select Taste:
          <SelectList
            data={tastes}
            callback={(cb) =>
              setPredictionRequest({ ...prdictionRequest, taste: cb.value })
            }
          />
        </label>

        <label>
          Select Date:
          <br />
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setPredictionRequest({ ...prdictionRequest, date });
            }}
          />
        </label>

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
        <h3>
          שם עיר: {prdictionRequest.cityName}
          <br/>
          סוג האוכלוסיה בעיר: {cityData.cityType} 
          <br/>
          הרכב האוכלוסיה הוא - פעוטים: {(Math.floor(cityData.toddlers * 100)) + 1}%, ילדים: {Math.floor(cityData.kids * 100)}%, בוגרים: {Math.floor(cityData.adolescent * 100)}%,
           מבוגרים: {Math.floor(cityData.adults * 100)}%, עמידה: {Math.floor(cityData.middleAge * 100)}%, זהב: {Math.floor(cityData.seniors * 100)}%
          <br/>
          בתאריך: {new Date(prdictionRequest.date).toLocaleDateString("en-ca")} עונה: {cityData.season}, מזג האוויר: {cityData.weather},  חג: {cityData.holiday}
          <br/>
          חיזוי הקניה לטעם {cityData.taste} היא {predictionData} ק"ג
        </h3>
      ) : (
        <></>
      )}
    </div>
  );
};
