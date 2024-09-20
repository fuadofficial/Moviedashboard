const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Get all movies')
})

router.post('/', (req, res) => {
    const newMovie = req.body;
    res.send(`New movie added: ${JSON.stringify(newMovie)}`);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Get movie with id: ${id}`);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Delete movie with id: ${id}`);
});

module.exports = router;