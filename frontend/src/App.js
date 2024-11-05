import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import MyCourse from './pages/User/MyCourse'
import UserProfile from './pages/User/UserProfile';
function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/my-courses" element={<MyCourse />} />
                <Route path="/home" element={<Home />} />
                <Route path="/user-profile" element={<UserProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
