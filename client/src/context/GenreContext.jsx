import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const GenreContext = createContext();

const API_URL = 'http://localhost:3000/genre';

// eslint-disable-next-line react/prop-types
export const GenreProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);

    // Fetch genres from the API
    const fetchGenres = async () => {
        try {
            const response = await axios.get(API_URL);
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error.message);
        }
    };

    // Automatically fetch genres when the component mounts
    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <GenreContext.Provider value={{ genres, setGenres, fetchGenres }}>
            {children}
        </GenreContext.Provider>
    );
};

export const useGenres = () => useContext(GenreContext);
