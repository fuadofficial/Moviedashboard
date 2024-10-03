const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb+srv://ahmadfuadoorakam:lgUDOqRc6YBfEWvH@cluster0.j1ru7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB at: " + connection.host);
    } catch (error) {
        console.log("Connection error:", error);
    }
};

module.exports = connectDb;

