const express = require('express');
const router = express.Router();
const Genre = require('../model/genreModel');

router.get('/', async (req, res) => {
    try 
    res.status(200).json(Genre);
} catch (error) {
    res.status(400).json({
        message: error.message
    });
}
});

app.post('/', async (req, res) => {
    try {
        const { genre } = req.body;
        await Genre.create(genre);
        const allGenres = await Genre.find();
        res.status(200).json(allGenres);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});