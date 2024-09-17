import { useContext } from "react"
import { SidebarContext } from "../../context/SidebarContext"
import './AddMovie.css'
import NewMovie from "../../components/NewMovie/NewMovie"

const AddMovie = () => {

    const { sidebarMinimize } = useContext(SidebarContext)

    return (
        <div className="addmovie-container" onClick={sidebarMinimize}>
            <NewMovie />
        </div>
    )
}

export default AddMovie
