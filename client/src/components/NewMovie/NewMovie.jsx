import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewMovie.css';
import { useGenres } from '../../context/GenreContext';
import { useMovies } from '../../context/MovieContext ';

const NewMovie = () => {
    const { genres } = useGenres();
    const { addMovie } = useMovies();
    const navigate = useNavigate(); // Hook for navigation
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
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
        if (selectedGenres.length < 1 || selectedGenres.length > 5) newErrors.checkboxes = 'Please select between 1 and 5 genres.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setErrors({});
            const newMovie = {
                id: Date.now(), // Simple ID generation for demo purposes
                name: title,
                description,
                special: selectedGenres,
                image: URL.createObjectURL(image),
                rating
            };
            addMovie(newMovie); // Add movie using context

            // Navigate to MovieList page after successful submission
            navigate('/');

            // Clear form
            setTitle('');
            setDescription('');
            setRating(0);
            setImage(null);
            setSelectedGenres([]);
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
        setSelectedGenres(prevSelectedGenres => {
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
                                src={URL.createObjectURL(image)}
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
                        value={title}
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
                    {genres.map((item, index) => (
                        <div className="tick-box" key={index}>
                            <label>{item}</label>
                            <input
                                type="checkbox"
                                className='tick-box'
                                checked={selectedGenres.includes(item)}
                                onChange={() => handleCheckboxChange(item)}
                            />
                        </div>
                    ))}
                    {errors.checkboxes && <span className="error-message">{errors.checkboxes}</span>}
                </div>
                <div className="button">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default NewMovie;
