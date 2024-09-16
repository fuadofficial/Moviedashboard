import MovieList from "../../components/MovieList/MovieList"
import SideBar from "../../components/SideBar/SideBar"
import './Home.css'

const Home = () => {
    return (
        <div className="home-page-container">
            <SideBar />
            <MovieList />
        </div>
    )
}

export default Home
