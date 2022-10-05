const axios = require("axios").default;

let date = "1994-04-11"

return new Promise((resolve, reject) => {
    // Make a request for a user with a given ID
    axios
      .get(
        `https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1&strict=1`
      )
      .then(async function (res) {
        // handle success
        console.log(res.data.hebrew);        
  

      });
  });




