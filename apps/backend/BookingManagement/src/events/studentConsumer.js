// In booking-service/src/events/studentConsumer.js
const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'booking-service', brokers: ['kafka:9092'] });
const consumer = kafka.consumer({ groupId: 'booking-student-group' });

async function startStudentConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'student-events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const key = message.key.toString();
            const data = JSON.parse(message.value.toString());

            if (key === 'student-created') {
                console.log('📥 BookingService received:', data);
                // store into local cache or create a local copy
            }
        }
    });
}

module.exports = { startStudentConsumer };