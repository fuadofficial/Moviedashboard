import { SiThemoviedatabase } from "react-icons/si";
import './Header.css'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar-container">
            <div className="logo">
                <SiThemoviedatabase />
            </div>
            <div>
                <Link to={'/addmovie'}>
                    <button>Add new movie</button>
                </Link>
            </div>
        </nav>
    )
}

export default Header
