import { MdDelete } from "react-icons/md";
import './MovieList.css';
import { FaRegEdit } from 'react-icons/fa';
import { useMovies } from "../../context/MovieContext ";

const MovieList = () => {
    const { movies, setMovies } = useMovies();

    const handleDelete = (id, name) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete ${name}?`);
        if (userConfirmed) {
            setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
        }
    };

    return (
        <div className="movielist-container">
            {movies.map(movie => (
                <div className='movie-card' key={movie.id}>
                    <img src={movie.image} alt={movie.name} className='movie-image' />
                    <div className='movie-details'>
                        <h3 className='movie-name'>{movie.name}</h3>
                        <p className='movie-description'>{movie.description}</p>
                        <div>
                            {movie.special && (
                                <div className="movie-additional">
                                    {movie.special.map((specialItem, index) => (
                                        <div key={index} className="movie-special">{specialItem}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='movie-rating'>
                            {'★'.repeat(movie.rating)}{'☆'.repeat(5 - movie.rating)}
                        </div>
                        <div className="cart-icons">
                            <FaRegEdit className=" cart-icon" />
                            <MdDelete onClick={() => handleDelete(movie.id, movie.name)} className="cart-icon" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
