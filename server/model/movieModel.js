const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            minLength: 1,
            maxLength: 25,
            required: true
        },
        description: {
            type: String,
            minLength: 1,
            maxLength: 50,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        special: {
            type: [String],
            required: true
        },
        image: {
            type: Buffer,
            required: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

module.exports = mongoose.model('Movie', movieSchema) 