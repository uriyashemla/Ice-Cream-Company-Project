const axios = require("axios").default;

const storesNum = 100;

// Make a request for a user with a given ID
axios
  .get(
    `https://data.gov.il/api/3/action/datastore_search?resource_id=a5e7080d-3c37-49c2-8cd0-cb2724809216&limit=${
      storesNum + 10000
    }`
  )
  .then(function (storesResult) {
    // handle success
    const stores = storesResult.data.result.records;

    let correctStores = 0;
    let storesArray = [];

    Object.values(stores).forEach(async (store) => {
      if (store.שם_ישוב.trim() !== "לא רשום" && correctStores < storesNum && store.סהכ > 15000) {
        correctStores++;

        let citizenData;

        let storeObject = {
          name: store.שם_ישוב.trim(),
          cityType: "mixed",
          toddlers: store.גיל_0_6 / store.סהכ,
          kids: store.גיל_6_18 / store.סהכ,
          adolescent: store.גיל_19_45 / store.סהכ,
          adults: store.גיל_46_55 / store.סהכ,
          middleAge: store.גיל_56_64 / store.סהכ,
          seniors: store.גיל_65_פלוס / store.סהכ
        };

        let url = `https://boardsgenerator.cbs.gov.il/Handlers/WebParts/YishuvimHandler.ashx?dataMode=Yeshuv&filters=%7B%22Years%22:%222021%22%7D&filtersearch=${encodeURIComponent(
          store.שם_ישוב.trim()
        )}&language=Hebrew&mode=GridData&pageNumber=1&search=&subject=BaseData`;

        try {
          citizenData = await axios.get(url);
        } catch (error) {}

        // console.log(store.שם_ישוב);
        citizenData.data.Table?.forEach((tableResult) => {
          if (tableResult.Name === store.שם_ישוב.trim()) {
            const jews = parseInt(tableResult.PepoleNumberJewish.replace(',','')) || 0;
            const arabs = parseInt(tableResult.PepoleNumberArab.replace(',','')) || 0;

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

        storesArray.push(storeObject);
        console.log(storeObject);

      }
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
