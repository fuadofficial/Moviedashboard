import { useContext } from "react"
import { SidebarContext } from "../../context/SidebarContext"
import './Genre.css'
import AddGenre from "../../components/AddGenre/AddGenre"

const Genre = () => {

    const { sidebarMinimize } = useContext(SidebarContext)

    return (
        <div className="genre-page-container" onClick={sidebarMinimize}>
            <AddGenre />
        </div>
    )
}

export default Genre
