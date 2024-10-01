const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb+srv://ahmadfuadoorakam:xPkViPFz5bW4GlTj@cluster0.10tdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB at: " + connection.host);
    } catch (error) {
        console.log("Connection error:", error);
    }
};

module.exports = connectDb;



