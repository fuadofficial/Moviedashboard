import { CiAlignLeft } from "react-icons/ci";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import './SideBar.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { FaWindowClose } from "react-icons/fa";

const SideBar = () => {
    const { isMinimized, toggleSidebar } = useContext(SidebarContext)

    return (
        <div className={`sidebar-container ${isMinimized ? 'minimized' : ""}`}>
            <div className="sidebar-position">

                <div className="minimize-bar" onClick={toggleSidebar}>
                    {isMinimized ? <CiAlignLeft /> : <FaWindowClose className="close-icon" />}
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <Link to="/"><RiDashboardLine className="movie" />{isMinimized ? "" : "Home"}</Link>
                        </li>
                        <li>
                            <Link to="/addmovie"><AiOutlineAppstoreAdd className="movie" />{isMinimized ? "" : "Add Movie"}</Link>
                        </li>
                        <li>
                            <Link to="/genre"><BsListCheck className="movie" />{isMinimized ? "" : "Genre"}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar
