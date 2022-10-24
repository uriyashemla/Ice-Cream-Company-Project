import React, { useEffect, useState } from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import "./MainScreen.css";
import { getAllCities } from "../../api/batchLayer";
import {
  getAllInventory,
  getAllTastes,
  getStoreInventory,
} from "../../api/streamLayer";
import SelectList from "../../components/SelectList/SelectList";
import StoresInventory from "../../components/StoresInventory/StoresInventory";
import TotalInventory from "../../components/TotalInventory/TotalInventory";
import Prediction from "../../components/Prediction/Prediction";

export default () => {
  const [allCities, setAllCities] = useState("");
  const [allTastes, setAllTastes] = useState("");
  const [allInventory, setAllInventory] = useState(null);

  const fetchAllData = async () => {
    try {
      setAllCities(await getAllCities());
      setAllTastes(await getAllTastes());
      setAllInventory(await getAllInventory());
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllData();

    let timer = setInterval(async () => {}, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Tabs>
        <TabList style={{ fontSize: "20px", fontWeight: "bolder" }}>
          <Tab>🏪 Stores Inventory</Tab>
          <Tab>🧺 Total Inventory</Tab>
          <Tab>🐱‍👤 Prediction</Tab>
          <Tab>🌎 Maps</Tab>
        </TabList>

        <TabPanel>
          {allCities[0] && allTastes[0] ? (
            <StoresInventory cities={allCities} tastes={allTastes} />
          ) : (
            <h1>No Data Available</h1>
          )}
        </TabPanel>
        <TabPanel>
          <TotalInventory inventoryData={allInventory} tastes={allTastes} />
        </TabPanel>
        <TabPanel>
          {allCities[0] && allTastes[0] ? (
            <Prediction cities={allCities} tastes={allTastes} />
          ) : (
            <h1>No Data Available</h1>
          )}
        </TabPanel>
        <TabPanel>
          <h2>Maps</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};
