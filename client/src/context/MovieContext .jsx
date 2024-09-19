import { createContext, useState, useContext } from 'react';

// Create Context
const MovieContext = createContext();

// Create Provider Component
// eslint-disable-next-line react/prop-types
export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [editingMovie, setEditingMovie] = useState(null); // State for editing movie

    // Add new movie
    const addMovie = (movie) => {
        setMovies((prevMovies) => [...prevMovies, movie]);
    };

    // Update existing movie
    const updateMovie = (updatedMovie) => {
        setMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.id === updatedMovie.id ? updatedMovie : movie
            )
        );
        setEditingMovie(null); // Clear the editing movie state after update
    };

    // Set movie to edit
    const startEditing = (movie) => {
        setEditingMovie(movie);
    };

    return (
        <MovieContext.Provider value={{ movies, addMovie, updateMovie, setMovies, editingMovie, startEditing }}>
            {children}
        </MovieContext.Provider>
    );
};

// Custom hook to use the Movie context
export const useMovies = () => useContext(MovieContext);
