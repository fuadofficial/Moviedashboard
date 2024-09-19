// GenreContext.js
import { createContext, useState, useContext } from 'react';

const GenreContext = createContext();

// eslint-disable-next-line react/prop-types
export const GenreProvider = ({ children }) => {
    const [genres, setGenres] = useState(["Action", "Adventure", "Comedy", "Drama", "Horror", "Thriller","Sci-Fi","Fantasy"]);

    return (
        <GenreContext.Provider value={{ genres, setGenres }}>
            {children}
        </GenreContext.Provider>
    );
};

export const useGenres = () => useContext(GenreContext);
