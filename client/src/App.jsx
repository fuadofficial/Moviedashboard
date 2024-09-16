import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style/globarStyle.css'
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SideBar from './components/SideBar/SideBar';

const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <SideBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default App
