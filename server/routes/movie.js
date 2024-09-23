const express = require('express')
const router = express.Router()

let movies = [
    {
        id: 1,
        image: "data:image/jpeg;base64,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",
        name: "fuad",
        description: "i am the best",
        rating: 4,
        special: ["action", "comady"],
    },
];

router.get('/', (req, res) => {
    try {
        res.json(movies);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', (req, res) => {
    try {
        const newMovie = req.body;
        movies.push(newMovie);
        res.status(201).json({ message: 'New movie added', movie: newMovie });
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', (req, res) => {
    try {
        const { id } = req.params; // Get the movie id from the URL parameters
        const { title, description, rating, image } = req.body; // Destructure the updated data from the request body

        // Find the movie by its id
        const movie = movies.find(movie => movie.id === parseInt(id));

        if (movie) {
            // Update the movie's details
            if (title) movie.title = title;
            if (description) movie.description = description;
            if (rating) movie.rating = rating;
            if (image) movie.image = image;

            // Send the updated movie in the response
            res.status(200).json({
                message: 'Movie updated successfully',
                updatedMovie: movie
            });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;

        // Filter the movies array to remove the movie with the specified ID
        movies = movies.filter(movie => movie.id !== id);

        // Check if the movie was found and deleted
        if (!movies) {
            return res.status(404).json({ message: `Movie with id ${id} not found` });
        }

        res.json({ message: `Movie with id ${id} deleted` });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        res.status(500).json({ message: 'An error occurred while deleting the movie', error: error.message });
    }
});


module.exports = router;
