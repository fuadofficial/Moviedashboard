const express = require('express')
const router = express.Router()
const movies = require('../model/movieModel')
//     try {
//         res.json(movies);
//     } catch (error) {
//         console.log(error);
//     }
// });

router.get('/', async (req, res) => {
    const movie = await movies.find().select('title description rating image ');
    res.status(200).json(movie);
});

//     try {
//         const newMovie = req.body;
//         movies.push(newMovie);
//         res.status(201).json({ message: 'New movie added', movie: newMovie });
//     } catch (error) {
//         console.log(error);
//     }
// });

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

router.put('/', async (req, res) => {
    try {
        const { _id, title, description, rating, image } = req.body;

        const fieldToUpdate = {
            title,
            description,
            rating,
            image
        }

        const updateData = await movies.findByIdAndUpdate(_id, fieldToUpdate, { new: true })

        if (updateData) {
            const allTodos = await movies.find()
            return res.status(200).json(allTodos)
        }

        res.status(400).json({
            message: `item with id: ${_id} does not exist for update`
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

//     try {
//         const { id } = req.params;

//         // Filter the movies array to remove the movie with the specified ID
//         movies = movies.filter(movie => movie.id !== id);

//         // Check if the movie was found and deleted
//         if (!movies) {
//             return res.status(404).json({ message: `Movie with id ${id} not found` });
//         }

//         res.json({ message: `Movie with id ${id} deleted` });
//     } catch (error) {
//         // Handle any errors that occur during the deletion process
//         res.status(500).json({ message: 'An error occurred while deleting the movie', error: error.message });
//     }
// });

router.delete('/', async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedField = await movies.findByIdAndDelete(_id)

        if (deletedField) {
            const allTodos = await movies.find()
            return res.status(200).json(allTodos);
        }
        res.status(404).json({
            message: `Item : ${_id} , doesn't exist for delete`,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
});

module.exports = router;
