const express = require('express');
const router = express.Router();
const Genre = require('../model/genreModel');

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { genre } = req.body;
        await Genre.create({genre});
        const allGenres = await Genre.find();
        res.status(200).json(allGenres);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const { genre } = req.body; 

        const updatedGenre = await Genre.findByIdAndUpdate(id, { genre }, { new: true });

        if (!updatedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        res.status(200).json(updatedGenre);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; 

        const deletedGenre = await Genre.findByIdAndDelete(id);

        if (!deletedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        res.status(200).json({ message: 'Genre deleted successfully' });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;