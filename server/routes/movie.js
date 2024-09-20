const express = require('express')
const router = express.Router()

let movies = []; // You can replace this with a database.

router.get('/', (req, res) => {
    res.json(movies); // Return all movies
});

router.post('/', (req, res) => {
    const newMovie = req.body;
    movies.push(newMovie); // Add new movie to the array
    res.status(201).json({ message: 'New movie added', movie: newMovie });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    movies = movies.filter(movie => movie.id !== id);
    res.json({ message: `Movie with id ${id} deleted` });
});

module.exports = router;
