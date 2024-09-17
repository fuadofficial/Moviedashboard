import { useState } from 'react';
import './NewMovie.css';

const NewMovie = () => {
    const [specialOptions, setSpecialOptions] = useState([]);
    const [rating, setRating] = useState(1);

    const handleSpecialOptionsChange = (e) => {
        const selectedOption = e.target.value;
        if (specialOptions.includes(selectedOption)) {
            setSpecialOptions(specialOptions.filter(option => option !== selectedOption));
        } else if (specialOptions.length < 5) {
            setSpecialOptions([...specialOptions, selectedOption]);
        } else {
            alert('You can only select a maximum of 5 special options.');
        }
    };

    return (
        <div className='newmovie-container'>
            <h2>Add a New Movie</h2>

            {/* Image Upload */}
            <div className='form-group'>
                <label>Upload Movie Image:</label>
                <input type='file' accept='image/*' />
            </div>

            {/* Movie Title */}
            <div className='form-group'>
                <label>Movie Title:</label>
                <input type='text' placeholder='Enter movie title' />
            </div>

            {/* Movie Description */}
            <div className='form-group'>
                <label>Movie Description:</label>
                <textarea placeholder='Enter movie description'></textarea>
            </div>

            {/* Movie Special Options (max 5) */}
            <div className='form-group'>
                <label>Special Options (max 5):</label>
                <div className='special-options'>
                    <label>
                        <input
                            type='checkbox'
                            value='3D'
                            onChange={handleSpecialOptionsChange}
                            checked={specialOptions.includes('3D')}
                        />
                        3D
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='IMAX'
                            onChange={handleSpecialOptionsChange}
                            checked={specialOptions.includes('IMAX')}
                        />
                        IMAX
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='Subtitled'
                            onChange={handleSpecialOptionsChange}
                            checked={specialOptions.includes('Subtitled')}
                        />
                        Subtitled
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='Dolby Atmos'
                            onChange={handleSpecialOptionsChange}
                            checked={specialOptions.includes('Dolby Atmos')}
                        />
                        Dolby Atmos
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='4DX'
                            onChange={handleSpecialOptionsChange}
                            checked={specialOptions.includes('4DX')}
                        />
                        4DX
                    </label>
                </div>
            </div>

            {/* Rating (1 to 5) */}
            <div className='form-group'>
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value='1'>1 Star</option>
                    <option value='2'>2 Stars</option>
                    <option value='3'>3 Stars</option>
                    <option value='4'>4 Stars</option>
                    <option value='5'>5 Stars</option>
                </select>
            </div>
        </div>
    );
};

export default NewMovie;
