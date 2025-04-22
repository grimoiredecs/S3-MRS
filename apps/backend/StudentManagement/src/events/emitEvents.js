// events/emitEvent.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'student-service',
    brokers: ['kafka:9092']
});

const producer = kafka.producer();
let connected = false;

async function emitEvent(topic, key, value) {
    if (!connected) {
        await producer.connect();
        connected = true;
    }

    await producer.send({
        topic,
        messages: [{ key, value: JSON.stringify(value) }]
    });
}

module.exports = { emitEvent };