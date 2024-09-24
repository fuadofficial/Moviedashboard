import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NewMovie.css';
import { useGenres } from '../../context/GenreContext';
import { nanoid } from 'nanoid';
import axios from 'axios';

const API_URL = "http://localhost:3000";

const NewMovie = () => {
    const { genres } = useGenres();
    const navigate = useNavigate();
    const location = useLocation();
    const movieToEdit = location.state?.movie || null;

    const [title, setTitle] = useState(movieToEdit ? movieToEdit.title : '');
    const [description, setDescription] = useState(movieToEdit ? movieToEdit.description : '');
    const [rating, setRating] = useState(movieToEdit ? movieToEdit.rating : 0);
    const [image, setImage] = useState(movieToEdit ? movieToEdit.image : null);
    const [special, setSpecial] = useState(movieToEdit ? movieToEdit.special : []);
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        rating: '',
        image: '',
        checkboxes: ''
    });

    const validateForm = () => {
        const newErrors = {};
        if (!title.trim()) {
            newErrors.title = 'Please enter a title.';
        } else if (title.length > 25) {
            newErrors.title = 'Title cannot exceed 25 characters.';
        }

        if (!description.trim()) {
            newErrors.description = 'Please enter a description.';
        } else if (description.length > 50) {
            newErrors.description = 'Description cannot exceed 50 characters.';
        }

        if (rating <= 0) newErrors.rating = 'Please select a rating.';
        if (!image) newErrors.image = 'Please upload an image.';
        if (special.length < 1 || special.length > 5) newErrors.checkboxes = 'Please select between 1 and 5 genres.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append('id', movieToEdit ? movieToEdit.id : nanoid());
            formData.append('title', title);
            formData.append('description', description);
            formData.append('rating', rating);
            formData.append('image', image);
            formData.append('special', JSON.stringify(special));

            try {
                if (movieToEdit) {
                    await axios.put(`${API_URL}/${movieToEdit._id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                } else {
                    await axios.post(API_URL, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                }

                setTimeout(() => navigate('/'), 100); // Small delay to ensure state update
                // Clear form after submitting
                setTitle('');
                setDescription('');
                setRating(0);
                setImage(null);
                setSpecial([]);
            } catch (error) {
                console.error('Error submitting movie data', error);
            }
        }
    };


    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            [e.target.name]: ''
        }));
    };

    const handleCheckboxChange = (genre) => {
        setSpecial(prevSelectedGenres => {
            const newSelectedGenres = prevSelectedGenres.includes(genre)
                ? prevSelectedGenres.filter(g => g !== genre)
                : [...prevSelectedGenres, genre];
            if (newSelectedGenres.length < 1 || newSelectedGenres.length > 5) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    checkboxes: 'Please select between 1 and 5 genres.'
                }));
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    checkboxes: ''
                }));
            }
            return newSelectedGenres;
        });
    };

    return (
        <div className='newmovie-container'>
            <form onSubmit={handleSubmit}>
                <div className="upload-image">
                    <label className='lable-setup'>Image</label>
                    <div className='upload-image-container'>
                        <input
                            className='texts'
                            type='file'
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setImage(file);
                                setErrors(prevErrors => ({
                                    ...prevErrors,
                                    image: ''
                                }));
                            }}
                        />
                        {image && (
                            <img
                                className='image-preview'
                                src={typeof image === 'string' ? image : URL.createObjectURL(image)} // Display correct image format
                                alt='Preview'
                            />
                        )}
                    </div>
                    {errors.image && <span className="error-message">{errors.image}</span>}
                </div>
                <div className="title">
                    <label className='lable-setup'>Title</label>
                    <input
                        className='texts'
                        type='text'
                        name='title'
                        placeholder='Type here'
                        value={title} // Fix here: use title state
                        onChange={handleChange(setTitle)}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>
                <div className="description">
                    <label className='lable-setup'>Description</label>
                    <input
                        className='texts'
                        type='text'
                        name='description'
                        placeholder='Description'
                        value={description}
                        onChange={handleChange(setDescription)}
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>
                <div className="rating">
                    <label className="label">Rating</label>
                    <input
                        type="range"
                        name='rating'
                        value={rating}
                        onChange={(e) => {
                            setRating(Number(e.target.value));
                            setErrors(prevErrors => ({
                                ...prevErrors,
                                rating: ''
                            }));
                        }}
                        step="1"
                        min="1"
                        max="5"
                    />
                    <div className="numbers">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </div>
                    {errors.rating && <span className="error-message">{errors.rating}</span>}
                </div>
                <div className="tick-box-container">
                    <div className="button">
                        <Link className='new-genre' to={'/genre'}>Add New Genre</Link>
                    </div>
                    <div className="list">
                        {genres.map((item, index) => (
                            <div className="tick-box" key={index}>
                                <label>{item}</label>
                                <input
                                    type="checkbox"
                                    className='tick-box'
                                    checked={special.includes(item)}
                                    onChange={() => handleCheckboxChange(item)}
                                />
                            </div>
                        ))}
                        {errors.checkboxes && <span className="error-message">{errors.checkboxes}</span>}

                    </div>
                </div>
                <div className="button">
                    <button type='submit'>
                        {movieToEdit ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewMovie;
