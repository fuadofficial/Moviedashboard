import  { useState } from 'react';
import { useGenres } from '../../context/GenreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddGenre.css';

const API_URL = 'http://localhost:3000/genre';

const AddGenre = () => {
    const { fetchGenres } = useGenres(); 
    const navigate = useNavigate();

    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setGenre(e.target.value);
        if (e.target.value.trim() === '') {
            setError('Genre cannot be empty.');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (genre.trim() === '') {
            setError('Genre cannot be empty.');
            return;
        }

        try {
            await axios.post(API_URL, { genre });
            fetchGenres();
            setGenre(''); 
            setError('');
            navigate('/newmovie'); 
        } catch (error) {
            console.error('Error adding genre:', error.message);
            setError('Failed to add genre. Please try again.');
        }
    };

    return (
        <div className="addgenre-container">
            <form onSubmit={handleSubmit}>
                <div className="genre-input">
                    <label className='label-setup'>Add Genre</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={handleChange}
                        placeholder="Enter genre name"
                        className='text-input'
                    />
                </div>
                {error && <span className="error-message">{error}</span>}
                <button type="submit" className="add-genre-btn">Add Genre</button>
            </form>
        </div>
    );
};

export default AddGenre;
