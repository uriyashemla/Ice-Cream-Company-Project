import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import "./MainScreen.css";
import { getAllCities } from "../../api/batchLayer";
import {
  getAllInventory,
  getAllTastes,
  getStoreInventory,
} from "../../api/streamLayer";
import StoresInventory from "../../components/StoresInventory/StoresInventory";
import TotalInventory from "../../components/TotalInventory/TotalInventory";
import Prediction from "../../components/Prediction/Prediction";

export default () => {
  const [allCities, setAllCities] = useState("");
  const [allTastes, setAllTastes] = useState("");
  const [allInventory, setAllInventory] = useState(null);
  const [totalInventoryTimer, setTotalInventoryTimer] = useState(false);

  const fetchAllData = async () => {
    try {
      setAllCities(await getAllCities());
      setAllTastes(await getAllTastes());
      setAllInventory(await getAllInventory());
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    let timer = setInterval(async () => {
      try {
        if (totalInventoryTimer) setAllInventory(await getAllInventory());
      } catch (error) {}
    }, 3000);
    return () => clearInterval(timer);
  }, [totalInventoryTimer]);

  return (
    <div>
      <Tabs>
        <TabList style={{ fontSize: "20px", fontWeight: "bolder" }}>
          <Tab>🏪 Stores Inventory</Tab>
          <Tab>🧺 Total Inventory</Tab>
          <Tab>🐱‍👤 Prediction</Tab>
        </TabList>

        <TabPanel>
          {allCities[0] && allTastes[0] ? (
            <StoresInventory cities={allCities} tastes={allTastes} />
          ) : (
            <h1>No Data Available</h1>
          )}
        </TabPanel>
        <TabPanel>
          <TotalInventory
            inventoryData={allInventory}
            tastes={allTastes}
            callback={setTotalInventoryTimer}
          />
        </TabPanel>
        <TabPanel>
          {allCities[0] && allTastes[0] ? (
            <Prediction cities={allCities} tastes={allTastes} />
          ) : (
            <h1>No Data Available</h1>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};
