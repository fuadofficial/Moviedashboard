const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected.........');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

module.exports = connectDb;
