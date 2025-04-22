const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    userNumber: { type: Number, required: true },
    isPrivate: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Static method to query bookings with optional filters
bookingSchema.statics.queryBookings = async function (filters = {}) {
    return await this.find(filters);
};

// Static method to remove a booking by ID
bookingSchema.statics.removeById = async function (id) {
    return await this.deleteOne({ _id: id });
};

module.exports = mongoose.model('Booking', bookingSchema);