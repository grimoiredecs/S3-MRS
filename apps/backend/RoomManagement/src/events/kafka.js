const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'room-service',
    brokers: ['kafka:9092'] // or localhost if testing locally
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'room-group' });

module.exports = { kafka, producer, consumer };