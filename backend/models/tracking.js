import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    status: String,
    location: String,
    timestamp: {type: Date, default: Date.now}
});

const trackingSchema = new mongoose.Schema({
    _id: String,
    status: String,
    location: String,
    history: [historySchema],
    lastUpdated: {type: Date, default: Date.now}
});

export default mongoose.model('Tracking', trackingSchema);