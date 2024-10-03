import { createContext, useState, useContext } from 'react';
const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    
    const addMovie = (movie) => {
        setMovies((prevMovies) => [...prevMovies, movie]);
    };

    const updateMovie = (updatedMovie) => {
        setMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.id === updatedMovie.id ? updatedMovie : movie
            )
        );
    };

    return (
        <MovieContext.Provider value={{ movies, addMovie, updateMovie, setMovies }}>
            {children}
        </MovieContext.Provider>
    );
};


export const useMovies = () => useContext(MovieContext);
