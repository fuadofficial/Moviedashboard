import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GENRE_API_URL } from '../constants/const';

const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios(GENRE_API_URL);
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error.message);
        }
    };

    return (
        <GenreContext.Provider value={{ genres, setGenres, fetchGenres }}>
            {children}
        </GenreContext.Provider>
    );
};

export const useGenres = () => useContext(GenreContext);
