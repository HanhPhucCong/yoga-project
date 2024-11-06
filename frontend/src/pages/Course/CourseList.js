import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import courseApi from '../../service/courseApi';

function CourseList() {
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const coursesResponse = await courseApi.getAll();
            console.log(coursesResponse.data);
            toast.success(coursesResponse.message); // Hiển thị thông báo
            setCourses(coursesResponse.data.data); // Lưu danh sách khóa học vào state
        } catch (err) {
            console.error(err);
            toast.error('Không thể tải danh sách khóa học.');
        }
    };

    useEffect(() => {
        getCourses(); // Gọi API khi component load
    }, []);

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>Danh sách khóa học Yoga</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <div key={course._id} className='bg-white shadow-lg rounded-lg overflow-hidden'>
                            <img
                                src={course.imageUrl || 'https://via.placeholder.com/400'}
                                alt={course.title}
                                className='w-full h-48 object-cover'
                            />
                            <div className='p-4'>
                                <h2 className='text-2xl font-semibold text-gray-900 truncate'>{course.title}</h2>
                                <p className='text-gray-600 text-sm mt-2'>{course.description}</p>
                                <p className='mt-4 text-lg font-bold text-gray-800'>{`$${course.price}`}</p>
                                <button className='mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all'>
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-gray-500'>Không có khóa học nào.</p>
                )}
            </div>
        </div>
    );
}

export default CourseList;
