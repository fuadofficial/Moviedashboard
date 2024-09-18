import { MdDelete } from "react-icons/md";
import { FaRegEdit } from 'react-icons/fa';
import './AddGenre.css';
import { useState, useRef, useEffect } from "react";
import { useGenres } from "../../context/GenreContext";

const AddGenre = () => {
    const [inputValue, setInputValue] = useState("");
    const { genres, setGenres } = useGenres()
    const [editIndex, setEditIndex] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [editIndex]); // Focus input after setting editIndex

    const handleAddOrUpdateGenre = () => {
        if (inputValue.trim() === "") return;

        if (editIndex !== null) {
            // Update existing genre
            const updatedGenres = genres.map((genre, index) =>
                index === editIndex ? inputValue : genre
            );
            setGenres(updatedGenres);
            setEditIndex(null); // Clear edit index after update
        } else {
            // Add new genre
            setGenres([...genres, inputValue]);
        }

        setInputValue(""); // Clear input field
    };

    const handleDeleteGenre = (index, value) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete ${value}?`);
        if (userConfirmed) {
            const updatedGenres = genres.filter((_, id) => id !== index);
            setGenres(updatedGenres);
            if (editIndex === index) setEditIndex(null);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddOrUpdateGenre();
        }
    };

    const handleEditClick = (index) => {
        setInputValue(genres[index]);
        setEditIndex(index);
    };

    return (
        <div className='genre-container'>
            <div className="genre-cart">
                <div className="input-section">
                    <div className="title">
                        <p>{editIndex !== null ? 'Edit Title' : 'Add Title'}</p>
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
                            {editIndex !== null ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </div>
                <div className="genre-section">
                    {genres.map((value, index) => (
                        <div className="genre" key={index}>
                            <p>{value}</p>
                            <hr />
                            <div className="icons">
                                <FaRegEdit className="icon" onClick={() => handleEditClick(index)} />
                                <MdDelete className="icon" onClick={() => handleDeleteGenre(index, value)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddGenre;
