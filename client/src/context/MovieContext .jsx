import  { createContext, useState, useContext } from 'react';

// Create Context
const MovieContext = createContext();

// Create Provider Component
// eslint-disable-next-line react/prop-types
export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);

    const addMovie = (movie) => {
        setMovies(prevMovies => [...prevMovies, movie]);
    };

    return (
        <MovieContext.Provider value={{ movies, addMovie }}>
            {children}
        </MovieContext.Provider>
    );
};

// Custom hook to use the Movie context
export const useMovies = () => useContext(MovieContext);
