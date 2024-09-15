import { IoIosSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { SiThemoviedatabase } from "react-icons/si";
import './Header.css'

const Header = () => {
    return (
        <nav className="navbar-container">
            <div className="logo">
                <SiThemoviedatabase />
            </div>
            <div className="icons">
                <IoIosSearch className="icon" />
                <FaBell className="icon" />
            </div>
        </nav>
    )
}

export default Header
