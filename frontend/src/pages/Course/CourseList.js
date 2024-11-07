import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import courseApi from '../../service/courseApi';
import '../../assets/css/Course/course.css';
import enrollmentApi from '../../service/enrollmentApi';

function CourseList() {
    const [courses, setCourses] = useState([]);

    const handleDetailClick = async () => {
        toast.info('click detail');
    };

    const getCourses = async () => {
        try {
            const coursesResponse = await courseApi.getAll();
            console.log(coursesResponse.data);
            toast.success(coursesResponse.message); // Hiển thị thông báo
            setCourses(coursesResponse.data); // Lưu danh sách khóa học vào state
        } catch (err) {
            console.error(err);
            toast.error('Không thể tải danh sách khóa học.');
        }
    };

    useEffect(() => {
        getCourses(); // Gọi API khi component load
    }, []);

    return (
        <div className='course-list-container'>
            <h1 className='title'>Danh sách khóa học Yoga</h1>
            <div className='course-grid'>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course._id} className='course-card'>
                            <img
                                src={course.imageUrl || 'https://via.placeholder.com/400'}
                                alt={course.title}
                                className='course-image'
                            />
                            <div className='course-content'>
                                <h2 className='course-title'>{course.title}</h2>
                                <p className='course-description'>{course.description}</p>
                                <p className='course-price'>{`$${course.price}`}</p>
                                <button className='course-button' onClick={() => handleDetailClick()}>
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='no-courses'>Không có khóa học nào.</p>
                )}
            </div>
        </div>
    );
}

export default CourseList;
