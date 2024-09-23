const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            minLength: 2,
            maxLength: 20,
            required: true
        },
        description: {
            type: String,
            minLength: 4,
            maxLength: 50,
            required: true
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

module.exports = mongoose.model('Movie', movieSchema) 