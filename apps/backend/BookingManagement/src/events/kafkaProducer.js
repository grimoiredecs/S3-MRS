const { Kafka } = require("kafkajs");

const kafka = new Kafka({ clientId: "bookingService", brokers: ["localhost:9092"] });
const producer = kafka.producer();

const initProducer = async () => await producer.connect();

module.exports = {
    sendBookingCreatedEvent: async (booking) => {
        await initProducer();
        await producer.send({
            topic: "booking.created",
            messages: [
                { value: JSON.stringify(booking) }
            ],
        });
    }
};