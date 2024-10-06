const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/movie');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDb;
