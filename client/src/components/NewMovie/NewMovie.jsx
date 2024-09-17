import './NewMovie.css';

const NewMovie = () => {


    return (
        <div className='newmovie-container'>
            <div className="upload-image">
                <label className='lable-setup'>Image</label>
                <input className='texts' type='file' />
            </div>
            <div className="title">
                <label className='lable-setup' >Title</label>
                <input className='texts' type='text' placeholder='Type here' />
            </div>
            <div className="description">
                <label className='lable-setup' >Description</label>
                <input className='texts' type='text' placeholder='Description' />
            </div>
            <div className="rating">
                <label className="label">Rating</label>
                <input
                    type="range"
                    // value={rating}
                    step="25"
                // onChange={handleRatingChange}
                />
                <div className="nubmers">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
            </div>
            <div className="tick-box-container">
                <div className="tick-box">
                    <label>Action</label>
                    <input type="checkbox" className='tick-box' />
                </div>
                <div className="tick-box">
                    <label>Action</label>
                    <input type="checkbox" className='tick-box' />
                </div>
                <div className="tick-box">
                    <label>Action</label>
                    <input type="checkbox" className='tick-box' />
                </div>
                <div className="tick-box">
                    <label>Action</label>
                    <input type="checkbox" className='tick-box' />
                </div>
                <div className="tick-box">
                    <label>Action</label>
                    <input type="checkbox" className='tick-box' />
                </div>
                <div className="tick-box">
                    <label>Action</label>
                    <input type="checkbox" className='tick-box' />
                </div>
            </div>
            <div className="button">
                <button type='submit'>Submit</button>
            </div>
        </div>
    );
};

export default NewMovie;
