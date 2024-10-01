import { useState, useRef, useEffect } from 'react';
import { useGenres } from '../../context/GenreContext';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './AddGenre.css';

const API_URL = 'http://localhost:5000/genre';

const AddGenre = () => {
    const { genres, fetchGenres } = useGenres();  // Assuming genres are fetched from context
    const [inputValue, setInputValue] = useState('');  // For input value state
    const [editIndex, setEditIndex] = useState(null);  // For editing
    const [error, setError] = useState(null);  // For error handling
    const inputRef = useRef(null);  // For focusing the input

    useEffect(() => {
        fetchGenres(); // Fetch genres when the component mounts
    }, []);

    const handleAddOrUpdateGenre = async () => {
        if (inputValue.trim() === '') {
            setError('Genre cannot be empty.');
            return;
        }

        try {
            if (editIndex !== null) {
                const genreId = genres[editIndex]._id;
                await axios.put(`${API_URL}/${genreId}`, { genre: inputValue });
                fetchGenres(); // Refresh genre list after editing
                setEditIndex(null);  // Clear edit index
            } else {
                await axios.post(API_URL, { genre: inputValue });
                fetchGenres(); // Refresh genre list after adding
            }

            setInputValue("");  // Clear input field
            setError(null);  // Clear any existing errors
        } catch (error) {
            console.error('Error adding/updating genre:', error.message);
            setError('Failed to add/update genre. Please try again.');
        }

        inputRef.current.focus();  // Focus back on the input
    };

    const handleDeleteGenre = async (index, value) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete ${value}?`);
        if (userConfirmed) {
            try {
                const genreId = genres[index]._id;
                await axios.delete(`${API_URL}/${genreId}`);
                fetchGenres(); // Refresh genres after deletion
                if (editIndex === index) setEditIndex(null);  // Reset edit index if the deleted genre was being edited
            } catch (error) {
                console.error('Error deleting genre:', error.message);
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddOrUpdateGenre();
        }
    };

    const handleEditClick = (index) => {
        setInputValue(genres[index].genre);
        setEditIndex(index);
        inputRef.current.focus();
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
                            onChange={(e) => setInputValue(e.target.value)}
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleAddOrUpdateGenre}>
                            {editIndex !== null ? 'Update' : 'Add'}
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
