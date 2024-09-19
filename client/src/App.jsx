import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style/globarStyle.css'
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import AddMovie from './pages/AddMovie/AddMovie';
import Genre from './pages/Genre/Genre';

const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <SideBar />
                <Routes>
                    <Route path="/" element={<AddMovie />} />
                    <Route path="/movielist" element={<Home />} />
                    <Route path="/genre" element={<Genre />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
