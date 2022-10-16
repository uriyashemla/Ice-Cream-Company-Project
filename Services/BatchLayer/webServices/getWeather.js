const axios = require("axios");

module.exports = (date) => {
  let startDate = new Date(date);
  let toDate = new Date(date);
  toDate.setDate(toDate.getDate() + 7);

  startDate = startDate.toLocaleDateString("en-CA");
  toDate = toDate.toLocaleDateString("en-CA");
  let arr = [];

  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.hebcal.com/converter?cfg=json&start=${startDate}&end=${toDate}&g2h=1`
      )
      .then(async function (res) {
        const { hdates } = res.data;
        const eventsArr = Object.entries(hdates);
        eventsArr.forEach((hd) => {

         return hd[1].events.forEach((event) => {

            if(event.split(' ')[0] !=="Parashat"){
             return arr.push(event);
            }
          })
        });


        if(arr[0]) return resolve(true)
        return resolve(false);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
