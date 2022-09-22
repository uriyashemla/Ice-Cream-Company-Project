
const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const kafkaConf = require("../../config/kafka.cnfig");

const prefix = `${kafkaConf["sasl.username"]}-`
const topics = [`${prefix}new`];

const consumer = new Kafka.KafkaConsumer(kafkaConf, {
    "auto.offset.reset": "beginning"
  });
  const numMessages = 5;
  let counter = 0;
  consumer.on("error", function(err) {
    console.error(err);
  });
  consumer.on("ready", function(arg) {
    console.log(`Consumer ${arg.name} ready`);
    consumer.subscribe(topics);
    consumer.consume();
  });
  consumer.on("data", function(m) {
    counter++;
    if (counter % numMessages === 0) {
      console.log("calling commit");
      consumer.commit(m);
    }
    console.log(m.value.toString());
  });
  consumer.on("disconnected", function(arg) {
    process.exit();
  });
  consumer.on('event.error', function(err) {
    console.error(err);
    process.exit(1);
  });
  consumer.on('event.log', function(log) {
   // console.log(log);
  });
  consumer.connect();
  
  setTimeout(function() {
    consumer.disconnect();
  }, 300000);