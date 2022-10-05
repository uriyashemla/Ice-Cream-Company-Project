var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();

// for explanations : https://www.sitepoint.com/using-redis-node-js/

app.get('/test', function (req, res) {


// lists : rpush or lpush
/* client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});

// -1= get all
client.lrange('frameworks', 0, -1, function(err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
}); */

    redisClient.publish("message", "{\"message\":\"Hello from Redis\"}", function () {

    });

    redis.send('תקשרתי עם רדיס....')

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


redisClient.on('connect', function () {
    console.log('Sender connected to Redis');

});
redisClient.connect();
server.listen(6062, function () {
    console.log('Sender is running on port 6062');
});



