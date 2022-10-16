const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const kafkaConf = require("../../config/kafka.config");
require("dotenv").config();


const mongoTopic = process.env.KAFKA_TOPIC_MONGO;
const redisTopic = process.env.KAFKA_TOPIC_REDIS;

const producer = new Kafka.Producer(kafkaConf);
producer.setPollInterval(100)
producer
    .on("ready", (arg) =>
        console.log(`producer ${arg.name} ready. topics: ${mongoTopic}, ${redisTopic} `)
    )
    .on("event", (err) => console.log(err))
    .connect();

const publishMessage = async (purchase) => {            
    const m = Buffer.from(JSON.stringify(purchase));
    producer.produce(mongoTopic, null, m, uuid.v4());
    producer.produce(redisTopic, null, m, uuid.v4());
};

module.exports = {
    publishMessage,
};