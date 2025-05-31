const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Cluster76516:WGtse3VmfVZx@cluster76516.zzq9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster76516', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

mongoose.connect('mongodb+srv://Cluster76516:WGtse3VmfVZx@cluster76516.zzq9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster76516', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('✅ MongoDB connected');

        const { createBooking } = require('./bookingRepository');

        try {
            const result = await createBooking({
                userId: '2252304',
                roomId: '303-A4',
                startTime: new Date('2025-06-01T08:00:00'),
                endTime: new Date('2025-06-01T10:00:00'),
                userNumber: 2
            });
            console.log('✅ Booking created:', result);
        } catch (err) {
            console.error('❌ Error:', err.message);
        }

        mongoose.connection.close();
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));