const express = require('express')
const router = express.Router()
const movies = require('../model/movieModel')

router.get('/', async (req, res) => {
    const movie = await movies.find().select('title description rating image ');
    res.status(200).json(movie);
});

router.post('/', async (req, res) => {
    try {
        const { title, description, rating, image } = req.body;

        const movieItem = { title, description, rating, image };

        await movies.create(movieItem);
        const allMovies = await movies.find()

        res.status(200).json(allMovies);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, rating, image } = req.body;
        const updateData = await movies.findByIdAndUpdate(id, { title, description, rating, image }, { new: true });
        if (updateData) {
            const allMovies = await movies.find();
            return res.status(200).json(allMovies);
        }
        res.status(400).json({ message: `Movie with id: ${id} does not exist` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await movies.findByIdAndDelete(id);
        const allMovies = await movies.find();
        res.status(200).json(allMovies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
