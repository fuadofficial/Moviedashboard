import { CiAlignLeft } from "react-icons/ci";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import './SideBar.css'
import { Link } from "react-router-dom";
import { useState } from "react";

const SideBar = () => {

    const [isMinimized, setIsMinimized] = useState(false)

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized)
    }

    return (
        <div className={`sidebar-container ${isMinimized ? 'minimized' : ""}`}>
            <div className="minimize-bar" onClick={toggleSidebar}>
                <CiAlignLeft />
            </div>
            <div className="links">
                <ul>
                    <li>
                        <Link to="/"><RiDashboardLine className="movie" />{isMinimized ? "" : "Home"}</Link>
                    </li>
                    <li>
                        <Link to="/movieapp"><AiOutlineAppstoreAdd className="movie" />{isMinimized ? "" : "Movie App"}</Link>
                    </li>
                    <li>
                        <Link to="/genre"><BsListCheck className="movie" />{isMinimized ? "" : "Genre"}</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar
