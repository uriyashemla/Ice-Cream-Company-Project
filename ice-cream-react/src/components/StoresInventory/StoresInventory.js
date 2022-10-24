import React, { useState } from "react";
import SelectList from "../SelectList/SelectList";
import { CChart } from "@coreui/react-chartjs";
import { getStoreInventory } from "../../api/streamLayer";
import { getWeekPrediction } from "../../api/batchLayer";

export default ({ cities, tastes }) => {
  const [selectedStoreData, setSelectedStoreData] = useState(null);
  const [selectedTastePrediction, setSelectedTastePrediction] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStoreData = async (cityName) => {
    setLoading(true);
    setSelectedTastePrediction(null);
    setCity(cityName);
    try {
      let data = await getStoreInventory(cityName);
      setSelectedStoreData(data);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const getWeekPredictionData = async (taste) => {
    setLoading(true);
    setSelectedTastePrediction(null);

    try {
      let data = await getWeekPrediction(city, taste);
      setSelectedTastePrediction(data);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const getDateArr = () => {
    let arr = [];
    let date = new Date();
    let changingDate = new Date(date.getTime());

    for (let index = 0; index <= 6; index++) {
      changingDate.setDate(date.getDate() + index);
      arr.push(changingDate.toLocaleDateString("en-CA"));
    }
    return arr;
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(94,29,84,0.85)",
        height: "63vh",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <label>
          Select Store:
          <SelectList data={cities} callback={(cb) => getStoreData(cb.value)} />
        </label>
        <label>
          Select Taste:
          {selectedStoreData ? (
            <SelectList
              data={tastes}
              callback={(cb) => getWeekPredictionData(cb.value)}
            />
          ) : (
            <>
              <br />
              <label>Choose city first...</label>
            </>
          )}
        </label>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "50px",
          justifyContent: "space-evenly",
          height:"200px"
        }}
      >
        <span style={{ backgroundColor: "white", color: "black" }}>
          <CChart
            type="bar"
            data={{
              labels: tastes,
              datasets: [
                {
                  borderWidth: 3,
                  borderColor: "white",

                  backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 205, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(201, 203, 207, 1)",
                  ],
                  label: "Quantity",
                  data: selectedStoreData
                    ? Object.values(selectedStoreData)
                    : [],
                },
              ],
            }}
            labels="tastes"
          />
        </span>
        <span style={{ backgroundColor: "white", color: "black" }}>
          <CChart
            type="line"
            data={{
              labels: getDateArr(),
              datasets: [
                {
                  label: "Quantity",
                  backgroundColor: "blue",
                  data: selectedTastePrediction
                    ? Object.values(selectedTastePrediction)
                    : [],
                },
              ],
            }}
            labels="tastes"
          />
        </span>
      </div>
      {loading ? <h3>🔃 Fetching Data...</h3> : <></>}
    </div>
  );
};
