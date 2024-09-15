import { CiAlignLeft } from "react-icons/ci";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";

import './SideBar.css'
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="sidebar-container">
            <div className="minimize-bar">
                <CiAlignLeft />
            </div>
            <div className="links">
                <ul>
                    <li>
                        <Link to="/"><RiDashboardLine className="movie" />Home</Link>
                    </li>
                    <li>
                        <Link to="/movieapp"><AiOutlineAppstoreAdd className="movie" />Movie App</Link>
                    </li>
                    <li>
                        <Link to="/genre"><BsListCheck className="movie" />Genre</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar
