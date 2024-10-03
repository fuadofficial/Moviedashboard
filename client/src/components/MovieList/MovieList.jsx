import { MdDelete } from "react-icons/md";
import './MovieList.css';
import { FaRegEdit } from 'react-icons/fa';
import { useMovies } from "../../context/MovieContext ";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const MovieList = () => {
    const { movies, setMovies } = useMovies();
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${API_URL}/`);
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies", error);
        }
    };

    const handleDelete = async (movie) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete ${movie.title}?`);
        if (userConfirmed) {
            try {
                await axios.delete(`${API_URL}/${movie._id}`);
                setMovies((prevMovies) => prevMovies.filter((m) => m._id !== movie._id));
            } catch (error) {
                console.error('Error deleting movie', error);
            }
        }
    };

    const handleEdit = (movie) => {
        navigate('/addmovie', { state: { movie } });
    };

    return (
        <div className="movielist-container">
            {movies && movies.length > 0 ? (
                movies.map(movie => (
                    <div className="movie-card" key={movie._id}>

                        <img src={movie.image} alt={movie.title} className="movie-image" />

                        <div className="movie-details">
                            <h3 className="movie-title">{movie.title}</h3>

                            <p className="movie-description">{movie.description}</p>

                            <div className="movie-special">
                                {movie.special.map((item, index) => (
                                    <div className="movie-items" key={index}>
                                        <div className="movie-item">{item}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="movie-rating">
                                {'★'.repeat(movie.rating)}{'☆'.repeat(5 - movie.rating)}
                            </div>

                            <div className="cart-icons">
                                <FaRegEdit onClick={() => handleEdit(movie)} className="cart-icon" />
                                <MdDelete onClick={() => handleDelete(movie)} className="cart-icon" />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="addmovie-box">
                    <h1 className="heading">No movies available. Add a new movie to get started!</h1>
                    <Link to={'/addmovie'}>
                        <button>Add new movie</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MovieList;
