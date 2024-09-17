import { MdDelete } from "react-icons/md";
import { FaRegEdit } from 'react-icons/fa';

import './AddGenre.css'

const AddGenre = () => {
    return (
        <div className='genre-container'>
            <div className="genre-cart">
                <div className="input-section">
                    <div className="title">
                        <p>Title</p>
                    </div>
                    <div className="form">
                        <input type="text" placeholder='Type here' />
                        <button>submit</button>
                    </div>
                </div>
                <div className="genre-section">
                    <div className="genre">
                        <p>Action</p>
                        <hr />
                        <div className="icons">
                            <MdDelete  className="icon"/>
                            <FaRegEdit  className="icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGenre
