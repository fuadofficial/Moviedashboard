const express = require('express');
const multer = require('multer');
const router = express.Router();
const Movie = require('../model/movieModel');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const movieList = await Movie.find().select('title description rating special image');
        const moviesWithImages = movieList.map((movie) => ({
            ...movie.toObject(),
            image: movie.image ? `data:image/jpeg;base64,${movie.image.toString('base64')}` : null,
        }));
        res.status(200).json(moviesWithImages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, description, rating, special } = req.body;

        req.file ?
            image = { url: req.file.path, publicId: req.file.filename }
            : image = null;

        const movieItem = { title, description, rating, special, image };

        await Movie.create(movieItem);
        const allMovies = await Movie.find();

        res.status(200).json(allMovies);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, rating, special } = req.body;
        const image = req.file ? req.file.buffer : null;

        const updateData = await Movie.findByIdAndUpdate(
            id,
            { title, description, rating, special, ...(image && { image }) },
            { new: true }
        );
        if (updateData) {
            const allMovies = await Movie.find();
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
        await Movie.findByIdAndDelete(id);
        const allMovies = await Movie.find();
        res.status(200).json(allMovies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
