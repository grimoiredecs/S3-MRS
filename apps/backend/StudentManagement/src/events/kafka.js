const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'student-service',
    brokers: ['kafka:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'student-consumers' });

module.exports = { kafka, producer, consumer };