import { useContext } from "react"
import MovieList from "../../components/MovieList/MovieList"
import { SidebarContext } from "../../context/SidebarContext"
import './Home.css'

const Home = () => {

    const { sidebarMinimize } = useContext(SidebarContext)

    return (
        <div className="home-page-container" onClick={sidebarMinimize}>
            <MovieList />
        </div>
    )
}

export default Home
