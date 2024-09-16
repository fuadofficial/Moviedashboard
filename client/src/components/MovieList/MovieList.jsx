import { MdDelete } from "react-icons/md";
import './MovieList.css';
import { FaRegEdit } from 'react-icons/fa';

const MovieList = () => {
    // Sample data for movies
    const movies = [
        { id: 1, name: 'Movie 1', description: 'This is a short description for Movie 1.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 4 },
        { id: 2, name: 'Movie 2', description: 'This is a short description for Movie 2.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 5 },
        { id: 3, name: 'Movie 3', description: 'This is a short description for Movie 3.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 3 },
        { id: 4, name: 'Movie 4', description: 'This is a short description for Movie 4.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 2 },
        { id: 5, name: 'Movie 5', description: 'This is a short description for Movie 5.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 4 },
        { id: 6, name: 'Movie 6', description: 'This is a short description for Movie 6.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 5 },
        { id: 7, name: 'Movie 7', description: 'This is a short description for Movie 7.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 1 },
        { id: 8, name: 'Movie 8', description: 'This is a short description for Movie 8.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 3 },
        { id: 9, name: 'Movie 9', description: 'This is a short description for Movie 9.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 5 },
        { id: 10, name: 'Movie 10', description: 'This is a short description for Movie 10.', image: '../../../public/img/the-10-highest-grossing-marvel-movies-of-all-time_64ca.1280.webp', rating: 4 },
    ];

    return (
        <div className='movielist-container'>
            {movies.map(movie => (
                <div className='movie-card' key={movie.id}>
                    <img src={movie.image} alt={movie.name} className='movie-image' />
                    <div className='movie-details'>
                        <h3 className='movie-name'>{movie.name}</h3>
                        <p className='movie-description'>{movie.description}</p>
                        <div className='movie-additional'>Additional Info</div>
                        <div className='movie-rating'>
                            {'★'.repeat(movie.rating)}{'☆'.repeat(5 - movie.rating)}
                        </div>
                        <div className="cart-icons">
                            <FaRegEdit className=" cart-icon" />
                            <MdDelete className="cart-icon" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
