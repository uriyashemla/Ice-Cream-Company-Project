import React, { useEffect, useState } from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
import "./MainScreen.css";
import { getAllCities } from "../../api/batchLayer";
import SelectList from "../../components/SelectList/SelectList";

export default () => {
  const [allCities, setAllCities] = useState("");

  useEffect(async () => {
    try {
      setAllCities(await getAllCities());
    } catch (error) {}

    let timer = setInterval(async () => {}, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // useEffect(() => {
  //   console.log("all cities updated");
  // }, [allCities]);

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>🏪 Stores Inventory</Tab>
          <Tab>🧺 Total Inventory</Tab>
          <Tab>🐱‍👤 Prediction</Tab>
          <Tab>🌎 Maps</Tab>
        </TabList>

        <TabPanel>
          <label>
            Select Store:
            {allCities[0] ? (
              <SelectList
                data={allCities}
              />
            ) : (
              <></>
            )}
          </label>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};
