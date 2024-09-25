const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB at: " + connection.host);
    } catch (error) {
        console.log("Connection error:", error);
    }
}

module.exports = connectDb;

