import axios from 'axios';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (error.response) {
            const { status, data } = error.response;

            // Lấy message từ response hoặc đặt message mặc định nếu không có
            const message = data.message || 'An error occurred. Please try again.';

            if (status === 401) {
                toast.error(message || 'Unauthorized: Please log in to continue.');
            } else if (status === 403) {
                toast.error(message || 'Forbidden: You do not have permission to access this resource.');
            } else if (status === 400) {
                toast.error(message || 'Bad Request: Please check your input.');
            } else {
                toast.error(message); // Sử dụng message từ BE hoặc hiển thị lỗi chung
            }
        } else {
            toast.error('Network Error: Please check your connection.');
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
