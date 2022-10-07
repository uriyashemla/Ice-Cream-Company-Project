const _ = require("lodash");
const names = require("random-names-hebrew")

const cities = [
  "תל אביב",
  "ירושלים",
  "חיפה",
  "נתניה",
  "אריאל",
  "ראשון לציון",
  "רחובות",
  "גבעתיים",
  "אילת",
  "חדרה",
  "קריית שמונה",
  "באר שבע",
  "קריית ביאליק",
  "קריית אונו",
  "עפולה",
  "דימונה",
  "ירוחם",
  "כרמיאל",
  "כפר סבא",
  "נס ציונה",
  "נצרת",
  "פתח תקווה",
  "עכו",
  "עפולה",
  "ערד",
  "צפת"
];

const flavors=["חלבה","לימון", "תות", "שוקולד", "וניל"];
const genders = ["זכר", "נקבה"];


const ONE_MINUTE = 60 * 1000;

/**
 * This function generates a random call
*/
const generateBuy = () => {
  const start_time = Date.now();
  
  return {
    id: _.random(100000000, 999999999, false),
    start_time: start_time,
    name: names.create().fullName,
    age: _.random(1, 85, false),
    gender: _.sample(genders),
    city: _.sample(cities),
    flavor: _.sample(flavors)
    
  };
};

module.exports = {
  generateBuy,
};
