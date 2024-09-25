const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL || 'mongodb://mongodb://0.0.0.0:27017/movie');
        console.log("Connected to MongoDB at: " + connection.host);
    } catch (error) {
        console.log("Connection error:", error);
    }
}

module.exports = connectDb;

