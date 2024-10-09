import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NewMovie.css';
import { useGenres } from '../../context/GenreContext';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { API_URL } from '../../constants/const';

const NewMovie = () => {
    const { genres } = useGenres();
    const navigate = useNavigate();
    const location = useLocation();
    const movieToEdit = location.state?.movie || null;

    const [title, setTitle] = useState(movieToEdit ? movieToEdit.title : '');
    const [description, setDescription] = useState(movieToEdit ? movieToEdit.description : '');
    const [rating, setRating] = useState(movieToEdit ? movieToEdit.rating : 0);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(movieToEdit ? movieToEdit.image : null);
    const [special, setSpecial] = useState(movieToEdit ? movieToEdit.special : []);
    const [errors, setErrors] = useState({ title: '', description: '', rating: '', image: '', checkboxes: '' });

    console.log(special);

    useEffect(() => {
        if (movieToEdit && movieToEdit.image) {
            setImagePreview(movieToEdit.image);
        }
    }, [movieToEdit]);

    const validateForm = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Please enter a title.';
        if (title.length > 25) newErrors.title = 'Title cannot exceed 20 characters.';
        if (!description.trim()) newErrors.description = 'Please enter a description.';
        if (description.length > 75) newErrors.description = 'Description cannot exceed 75 characters.';
        if (rating <= 0) newErrors.rating = 'Please select a rating between 1 and 5.';
        if (!image && !imagePreview) newErrors.image = 'Please upload an image.';
        if (special.length < 1 || special.length >= 6) newErrors.checkboxes = 'Please select between 1 and 5 genres.';

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
            formData.append('special', special);
            if (image) { formData.append('image', image) }

            try {
                if (movieToEdit) {
                    await axios.put(`${API_URL}/${movieToEdit._id}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                } else {
                    await axios.post(API_URL, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                }
                navigate('/');
            } catch (error) {
                console.error('Error submitting movie data', error);
            }
        }
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [event.target.name]: '',
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
        }
    };

    const handleCheckboxChange = (genre) => {
        const updatedSpecial = special.includes(genre)
            ? special.filter((allGenres) => allGenres !== genre)
            : [...special, genre];

        setSpecial(updatedSpecial);

        if (updatedSpecial.length < 1 || updatedSpecial.length > 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                checkboxes: 'Please select between 1 and 5 genres.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                checkboxes: '',
            }));
        }
    };

    return (
        <div className='newmovie-container'>
            <form onSubmit={handleSubmit}>
                <div className='upload-image'>
                    <label className='label-setup'>Image</label>
                    <div className='upload-image-container'>
                        <input
                            className='texts'
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img
                                className='image-preview'
                                src={imagePreview}
                                alt='Preview'
                            />
                        )}
                    </div>
                    {errors.image && <span className='error-message'>{errors.image}</span>}
                </div>

                <div className='title'>
                    <label className='label-setup'>Title</label>
                    <input
                        className='texts'
                        type='text'
                        name='title'
                        placeholder='Type here'
                        value={title}
                        onChange={handleInputChange(setTitle)}
                    />
                    {errors.title && <span className='error-message'>{errors.title}</span>}
                </div>

                <div className='description'>
                    <label className='label-setup'>Description</label>
                    <input
                        className='texts'
                        type='text'
                        name='description'
                        placeholder='Description'
                        value={description}
                        onChange={handleInputChange(setDescription)}
                    />
                    {errors.description && <span className='error-message'>{errors.description}</span>}
                </div>

                <div className='rating'>
                    <label className='label'>Rating</label>
                    <input
                        type='range'
                        name='rating'
                        value={rating}
                        onChange={(e) => {
                            setRating(Number(e.target.value));
                            setErrors((prevErrors) => ({ ...prevErrors, rating: '' }));
                        }}
                        step='1'
                        min='0'
                        max='5'
                    />
                    <div className='numbers'>
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </div>
                    {errors.rating && <span className='error-message'>{errors.rating}</span>}
                </div>

                <div className='tick-box-container'>
                    <div className='list'>
                        {genres && genres.length > 0 ? (
                            genres.map((item, index) => {
                                return (
                                    <div className='tick-box' key={index}>
                                        <label>{item.genre}</label>
                                        <input
                                            type='checkbox'
                                            checked={special.includes(item.genre)}
                                            onChange={() => handleCheckboxChange(item.genre)}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div className='button'>
                                <Link className='new-genre' to='/genre'>
                                    Add New Genre
                                </Link>
                            </div>
                        )}
                        {errors.checkboxes && <span className='error-message'>{errors.checkboxes}</span>}
                    </div>
                </div>


                <div className='button'>
                    <button type='submit'>{movieToEdit ? 'Update' : 'Submit'}</button>
                </div>
            </form>
        </div>
    );
};

export default NewMovie;
