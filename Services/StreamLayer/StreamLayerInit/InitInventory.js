const Redis = require("redis");



redis
    .on("connect", function () {
        console.log("Reciever connected to Redis at: " + process.env.REDIS_URL);
    })
    .on("error", function (err) {
        console.log("Error " + err);
    });

(async () => {
    await redis.connect();
    const exist1 = await redis.exists("calls_data");
    if (exist1) {
        console.log("exist:", await redis.json.GET("calls_data"));
    } else {
        console.log("Creating:");
    }
})();
