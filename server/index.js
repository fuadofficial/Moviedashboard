const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const movieRouter = require('./routes/movie');
const genreRouter = require('./routes/genre');
require('dotenv').config()

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/public', express.static('public'));

app.use('/', movieRouter)
app.use('/genre', genreRouter)
app.all('*', (req, res) => {
    res.status(404).json("This page is not found");
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
