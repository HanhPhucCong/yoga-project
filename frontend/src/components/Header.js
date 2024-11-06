import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ localStorage khi Header được render
    useEffect(() => {
        const name = localStorage.getItem('name');
        if (name) {
            setUser({ name });
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        // Xóa thông tin người dùng khỏi localStorage và cập nhật state
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        setUser(null);
        setDropdownOpen(false);
        navigate('/login');
    };

    const handleMyCoursesClick = () => {
        if (user) {
            navigate('/my-courses');
        } else {
            navigate('/login');
        }
    };

    const handleNavigate = () => {
        navigate('/user-profile');
    };

    return (
        <header className='flex justify-between items-center py-4 px-6 bg-gray-50 relative'>
            <div className='text-lg font-semibold'>Website bán khóa học Yoga</div>
            <nav className='flex space-x-8 items-center'>
                <a href='/courses' className='text-gray-700 hover:text-black'>
                    TẤT CẢ KHÓA HỌC
                </a>
                <button onClick={handleMyCoursesClick} className='text-gray-700 hover:text-black'>
                    KHÓA HỌC CỦA TÔI
                </button>

                {user ? (
                    <div className='relative'>
                        <button onClick={toggleDropdown} className='text-gray-700 hover:text-black'>
                            {user.name}
                        </button>
                        {dropdownOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-md'>
                                <button
                                    onClick={handleNavigate}
                                    className='block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer bg-transparent border-none'
                                    style={{ textAlign: 'left' }}
                                >
                                    Xem tài khoản
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <a href='/login' className='text-gray-700 hover:text-black'>
                        Đăng nhập
                    </a>
                )}
            </nav>
        </header>
    );
}

export default Header;
