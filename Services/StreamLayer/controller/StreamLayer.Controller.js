const db = require("../database/InitInventory");


const updateInventory = (async (req,res) => {

    const value = await db.publisher.get(`אשדוד`);
    let obj = JSON.parse(value)
    //obj.Strawberry--;
    //await db.publisher.set(`אשדוד`,JSON.stringify(obj));
    console.log(await db.publisher.get(`אשדוד`));

    // await db.publisher.set(`${element.cityName}`,newValue);
});

updateInventory();