import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import MyCourse from './pages/User/MyCourse';
import UserProfile from './pages/User/UserProfile';
import SignUp from './pages/User/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CourseList from './pages/Course/CourseList';
function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/my-courses' element={<MyCourse />} />
                <Route path='/home' element={<Home />} />
                <Route path='/user-profile' element={<UserProfile />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path='/courses' element={<CourseList></CourseList>}></Route>
            </Routes>

            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
            />
        </Router>
    );
}

export default App;
