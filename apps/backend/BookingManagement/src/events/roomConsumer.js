const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'booking-service',
    brokers: ['kafka:9092'] // change if not docker
});

const consumer = kafka.consumer({ groupId: 'booking-group' });

const startRoomConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'room-events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = message.value.toString();
            const event = JSON.parse(value);

            console.log(`🟢 [Booking] Received Room Event: ${event.event_type}`);

            // Save to local cache, DB, or trigger internal logic
            switch (event.event_type) {
                case 'ROOM_CREATED':
                case 'ROOM_UPDATED':
                case 'ROOM_STATUS_CHANGED':
                case 'ROOM_CONDITION_CHANGED':
                    // Save to booking DB or update internal store
                    console.log('Room data:', event.payload);
                    break;
            }
        }
    });
};

module.exports = { startRoomConsumer };