import { MdDelete } from "react-icons/md";
import './MovieList.css';
import { FaRegEdit } from 'react-icons/fa';
import { useMovies } from "../../context/MovieContext ";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000"

const MovieList = () => {
    const { movies, setMovies } = useMovies();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();    

    useEffect(() => {
        fetchTodo()
    }, []);

    const fetchTodo = async () => {
        try {
            const response = await axios.get(`${API_URL}/`);
            setMovies(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movies", error);
            setLoading(false);
        }
    }

    const handleDelete = async (movie) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete ${movie.name}?`);
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
        navigate('/addmovie', { state: { movie } })
    }

    return (
        <div className="movielist-container">
            {loading ? (
                <h1>Loading movies...</h1>
            ) :
                movies && movies.length > 0 ? (
                    movies.map(movie => (
                        <div className='movie-card' key={movie._id}>
                            <img src={movie.image || '/default-image.jpg'} alt={movie.title} className="movie-image" />
                            <div className='movie-details'>
                                <h3 className='movie-name'>{movie.title}</h3>
                                <p className='movie-description'>{movie.description}</p>
                                <div>
                                    {movie.special && movie.special.length > 0 && (
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
                    ))
                )
                    :
                    <div className="addmovie-box">
                        <h1 className="heading">No movies available. Add a new movie to get started!</h1>
                        <Link to={'/addmovie'}>
                            <button>Add new movie</button>
                        </Link>
                    </div>
            }
        </div>
    );
};

export default MovieList;  
