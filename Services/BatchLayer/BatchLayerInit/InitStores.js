const axios = require("axios").default;

module.exports = () => {
  const storesNum = 100;
  let correctStores = 0;

  const loopStores = (stores) => {
    return new Promise(async (resolve, reject) => {
      let arrayToPush = [];
      let storesArray = [];

      for (const store of stores) {
        if (
          store.שם_ישוב.trim() !== "לא רשום" &&
          correctStores < storesNum &&
          store.סהכ > 15000
        ) {
          let citizenData;

          let storeObject = {
            id: correctStores,
            name: store.שם_ישוב.trim(),
            cityType: "mixed",
            toddlers: store.גיל_0_6 / store.סהכ,
            kids: store.גיל_6_18 / store.סהכ,
            adolescent: store.גיל_19_45 / store.סהכ,
            adults: store.גיל_46_55 / store.סהכ,
            middleAge: store.גיל_56_64 / store.סהכ,
            seniors: store.גיל_65_פלוס / store.סהכ,
          };

          correctStores++;

          let url = `https://boardsgenerator.cbs.gov.il/Handlers/WebParts/YishuvimHandler.ashx?dataMode=Yeshuv&filters=%7B%22Years%22:%222021%22%7D&filtersearch=${encodeURIComponent(
            store.שם_ישוב.trim()
          )}&language=Hebrew&mode=GridData&pageNumber=1&search=&subject=BaseData`;

          try {
            citizenData = await axios.get(url);
          } catch (error) {}

          // console.log(store.שם_ישוב);
          citizenData.data.Table?.forEach((tableResult) => {
            if (tableResult.Name === store.שם_ישוב.trim()) {
              const jews =
                parseInt(tableResult.PepoleNumberJewish.replace(",", "")) || 0;
              const arabs =
                parseInt(tableResult.PepoleNumberArab.replace(",", "")) || 0;

              if (jews === 0) {
                storeObject.cityType = "arab";
              } else if (arabs === 0) {
                storeObject.cityType = "jewish";
              } else {
                if (arabs / jews <= 0.05) {
                  storeObject.cityType = "jewish";
                } else if (jews / arabs <= 0.05) {
                  storeObject.cityType = "arab";
                } else {
                  storeObject.cityType = "mixed";
                }
              }
            }
          });

          arrayToPush.push(storeObject);
          storesArray.push(storeObject);
          arrayToPush = [];

        }
      }
      

      // Object.values(stores).forEach(async (store) => {

      // });
      return resolve(storesArray);
    });
  };

  return new Promise((resolve, reject) => {
    // Make a request for a user with a given ID
    axios
      .get(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=a5e7080d-3c37-49c2-8cd0-cb2724809216&limit=${
          storesNum + 10000
        }`
      )
      .then(async function (storesResult) {
        // handle success
        const stores = storesResult.data.result.records;
        
        let array = await loopStores(stores);
  

        if (!array) {
          return reject("error");
        }
        return resolve(array);
      });
  });
};
