import { MdDelete } from "react-icons/md";
import { FaRegEdit } from 'react-icons/fa';
import './AddGenre.css';
import { useState, useRef, useEffect } from "react";
import { useGenres } from "../../context/GenreContext";
import axios from "axios";

const API_URL = 'http://localhost:5000/genre'

const AddGenre = () => {
    const [inputValue, setInputValue] = useState("");
    const { genres, setGenres } = useGenres()
    const [editIndex, setEditIndex] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios.get(API_URL);
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error.message);
        }
    };

    const handleAddOrUpdateGenre = async () => {
        if (inputValue.trim() === "") return;

        try {
            if (editIndex !== null) {
                const genreId = genres[editIndex]._id;
                await axios.put(`${API_URL}/${genreId}`, { genre: inputValue });
                fetchGenres(); 
                setEditIndex(null);
            } else {
                await axios.post(API_URL, { genre: inputValue });
                fetchGenres(); 
            }

            setInputValue(""); 
        } catch (error) {
            console.error('Error adding/updating genre:', error.message);
        }

        inputRef.current.focus();
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
                </div>
                <div className="genre-section">
                    {genres.map((value, index) => (
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
