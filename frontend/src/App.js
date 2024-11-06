import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import MyCourse from './pages/User/MyCourse'
import UserProfile from './pages/User/UserProfile';
import SignUp from './pages/User/SignUp';
import ForgotPassword from './pages/ForgotPassword';
function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/my-courses" element={<MyCourse />} />
                <Route path="/home" element={<Home />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/sign-up" element={<SignUp />} />

            </Routes>
        </Router>
    );
}

export default App;
