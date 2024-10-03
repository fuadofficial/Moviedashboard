import { SiThemoviedatabase } from "react-icons/si";
import { RiDashboardLine } from "react-icons/ri";
import { BsListCheck } from "react-icons/bs";
import './Header.css'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar-container">
            <div>
                <Link to={'/'}>
                    <SiThemoviedatabase className="logo"/>
                </Link>
            </div>
            <div>
                <Link to={'/addmovie'}>
                    <RiDashboardLine className="add-new-movie" />
                </Link>
                <Link to={'/genre'}>
                    <BsListCheck className="add-new-movie" />
                </Link>
            </div>
        </nav>
    )
}

export default Header
