const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const connectDb = require('./config/db')
const movieRouter = require('./routes/movie');
require('dotenv').config()

app.use(cors());
app.use(express.json());

connectDb()

app.use('/', movieRouter)
app.all('*', (req, res) => {
    res.status(404).json("This page is not found");
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
