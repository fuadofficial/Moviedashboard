import { MdDelete } from "react-icons/md";
import './MovieList.css';
import { FaRegEdit } from 'react-icons/fa';
import { useMovies } from "../../context/MovieContext ";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
    const { movies, setMovies } = useMovies();
    const navigate = useNavigate();

    const handleDelete = (datas) => {
        console.log(datas); // Check the data being passed
        const userConfirmed = window.confirm(`Are you sure you want to delete ${datas.name} from the movie list?`);
        if (userConfirmed) {
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== datas.id));
        }
    };


    const handleEdit = (movie) => {
        navigate('/addmovie', { state: { movie } })
    }

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
                            <FaRegEdit onClick={() => handleEdit(movie)} className=" cart-icon" />
                            <MdDelete onClick={() => handleDelete(movie)} className="cart-icon" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
