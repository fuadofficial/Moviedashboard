import './NewMovie.css';

const NewMovie = () => {


    return (
        <div className='newmovie-container'>
            <div className="upload-image">
                <label htmlFor>Image</label>
                <input type='file' />
            </div>
            <div className="upload-image">
                <label htmlFor>Image</label>
                <input type='file' />
            </div>
        </div>
    );
};

export default NewMovie;
