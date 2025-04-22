const { producer } = require('./kafka');

const produceRoomEvent = async (eventType, payload) => {
    await producer.connect();
    await producer.send({
        topic: 'room-events',
        messages: [
            {
                key: eventType,
                value: JSON.stringify({
                    event_type: eventType,
                    timestamp: new Date().toISOString(),
                    payload
                })
            }
        ]
    });
    await producer.disconnect();
};

module.exports = { produceRoomEvent };