const { KafkaConsumer } = require("node-rdkafka");

const topic = process.env.KAFKA_TOPIC_REDIS;
const kafkaConsumer = new KafkaConsumer(require("../../config/kafka.config"));

kafkaConsumer
    .on("ready", (arg) => {
        kafkaConsumer.subscribe([topic]).consume();
        console.log(`Consumer ${arg.name} ready. topic: ${topic}`);
    })
    .on("disconnected", (arg) =>{
        console.log(`Consumer ${arg.name} disconnected.`)
        kafkaConsumer.connect();
})
    .on("event.error", (err) => console.error(err));

kafkaConsumer.connect();

module.exports = kafkaConsumer;