// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const kafkaConf = require("../../config/kafka.cnfig");

const prefix = `${kafkaConf["sasl.username"]}-`
const topic = `${prefix}new`;
const producer = new Kafka.Producer(kafkaConf);

const maxMessages = 5;

const genMessage = i => new Buffer.from(`Kafkakaka example, message number ${i}`);

producer.on("ready", function(arg) {
  console.log(`producer ${arg.name} ready.`);
  for (var i = 0; i < maxMessages; i++) {
    producer.produce(topic, -1, genMessage(i), i);
  }
 // setTimeout(() => producer.disconnect(), 0);
});

producer.on("disconnected", function(arg) {
  process.exit();
});

producer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
producer.on('event.log', function(log) {
  // console.log(log);
});
console.log(producer.listenerCount())
producer.connect();




// module.exports={publish}