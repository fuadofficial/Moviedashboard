import { useState, useRef, useEffect } from 'react';
import { useGenres } from '../../context/GenreContext';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './AddGenre.css';
import { GENRE_API_URL } from '../../constants/const';

const AddGenre = () => {
    const { genres, fetchGenres } = useGenres();
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);    

    useEffect(() => {
        fetchGenres();
        inputRef.current.focus();
    }, []);

    const handleAddOrUpdateGenre = async () => {
        if (inputValue.trim() !== '') {
            try {
                if (editIndex !== null) {
                    const genreId = editIndex;
                    await axios.put(`${GENRE_API_URL}/${genreId}`, { genre: inputValue });
                    setEditIndex(null);
                } else {
                    await axios.post(GENRE_API_URL, { genre: inputValue });
                }
                setInputValue('');
                fetchGenres();
            } catch (error) {
                console.error('Error adding/updating genre:', error.message);
                setError('Something went wrong while adding or updating the genre.');
            }
        } else {
            setError('Genre name cannot be empty');
        }
        inputRef.current.focus();
    };

    const handleDeleteGenre = async (value) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete ${value.genre}?`);
        if (userConfirmed) {
            try {
                const genreId = value._id;
                await axios.delete(`${GENRE_API_URL}/${genreId}`);
                fetchGenres();
                setEditIndex(null);
            } catch (error) {
                console.error('Error deleting genre:', error.message);
                setError('Something went wrong while deleting the genre.');
            }
        }
        inputRef.current.focus();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddOrUpdateGenre();
        }
    };

    const handleEditClick = (value) => {
        setInputValue(value.genre);
        setEditIndex(value._id);
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
                    {genres && genres.map((value) => (
                        <div className="genre" key={value._id}>
                            <p>{value.genre}</p>
                            <hr />
                            <div className="icons">
                                <FaRegEdit className="icon" onClick={() => handleEditClick(value)} />
                                <MdDelete className="icon" onClick={() => handleDeleteGenre(value)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddGenre;
