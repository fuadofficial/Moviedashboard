const mongoose = require("mongoose");

const genreSchema = mongoose.Schema(
    {
        genre: {
            type: String,
            minLength: 1,
            maxLength: 10,
            required: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

module.exports = mongoose.model('Genre', genreSchema) 