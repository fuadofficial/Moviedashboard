import { useState, useRef, useEffect } from 'react';
import { useGenres } from '../../context/GenreContext';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './AddGenre.css';

const API_URL = 'http://localhost:5000/genre';

const AddGenre = () => {
    const { genres, fetchGenres } = useGenres();
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        fetchGenres();
    }, []);

    const handleAddOrUpdateGenre = async () => {
        if (inputValue.trim() !== '') {
            try {
                if (editIndex !== null) {
                    const genreId = genres[editIndex]._id;
                    await axios.put(`${API_URL}/${genreId}`, { genre: inputValue });
                    setEditIndex(null);
                } else {
                    await axios.post(API_URL, { genre: inputValue });
                }
                setInputValue('');
                fetchGenres();
            } catch (error) {
                console.error('Error adding/updating genre:', error.message);
                setError('Something went wrong while adding or updating the genre.');
            }
        } else {
            setError('Genre name cannot be empty');
            inputRef.current.focus();
        }
    };

    const handleDeleteGenre = async (index, value) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete ${value}?`);
        if (userConfirmed) {
            try {
                const genreId = genres[index]._id;
                await axios.delete(`${API_URL}/${genreId}`);
                fetchGenres();
                if (editIndex === index) setEditIndex(null);
            } catch (error) {
                console.error('Error deleting genre:', error.message);
                setError('Something went wrong while deleting the genre.');
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddOrUpdateGenre();
        }
    };

    const handleEditClick = (index) => {
        setInputValue(genres[index].genre);
        setEditIndex(index);
        inputRef.current.focus();
        setError(null);
    };

    return (
        <div className='genre-container'>
            <div className="genre-cart">
                <div className="input-section">
                    <div className="title">
                        <p>{editIndex !== null ? 'Edit Genre' : 'Add Genre'}</p>
                    </div>
                    <div className="form">
                        <input
                            type="text"
                            placeholder='Type here'
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setError(null);
                            }}
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleAddOrUpdateGenre}>
                            {editIndex !== null ? 'Update' : 'Add'}
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="genre-section">
                    {genres && genres.map((value, index) => (
                        <div className="genre" key={index}>
                            <p>{value.genre}</p>
                            <hr />
                            <div className="icons">
                                <FaRegEdit className="icon" onClick={() => handleEditClick(index)} />
                                <MdDelete className="icon" onClick={() => handleDeleteGenre(index, value.genre)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddGenre;
