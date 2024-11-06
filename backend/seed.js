const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import các model
const User = require('./models/User');
const Course = require('./models/Course');
const Section = require('./models/Section');
const Lecture = require('./models/Lecture');
const Category = require('./models/Category');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

// Kết nối đến MongoDB
mongoose
    .connect(process.env.MONGO_URI, {

        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Dữ liệu mẫu
const seedData = async () => {
    try {
        // Tạo một số Category
        const categories = await Category.insertMany([
            { name: 'Development', description: 'All about programming and development' },
            { name: 'Design', description: 'Graphic and UX/UI design courses' },
            { name: 'Marketing', description: 'Digital marketing and sales courses' },
        ]);

        // Tạo một số Course
        const courses = await Course.insertMany([
            {
                title: 'JavaScript Basics',
                description: 'Learn the basics of JavaScript',
                price: 100,
                category: categories[0]._id,
                status: 'published',
            },
            {
                title: 'Advanced CSS',
                description: 'Master CSS for modern web design',
                price: 150,
                category: categories[1]._id,
                status: 'draft',
            },
            {
                title: 'Digital Marketing 101',
                description: 'An introduction to digital marketing',
                price: 120,
                category: categories[2]._id,
                status: 'published',
            },
        ]);

        // Tạo một số Section cho Course đầu tiên
        const sections = await Section.insertMany([
            { title: 'Introduction to JavaScript', courseId: courses[0]._id },
            { title: 'JavaScript Functions', courseId: courses[0]._id },
        ]);

        // Tạo một số Lecture cho Section đầu tiên
        const lectures = await Lecture.insertMany([
            {
                title: 'What is JavaScript?',
                contentUrl: 'http://example.com/js_intro.mp4',
                sectionId: sections[0]._id,
                contentType: 'video',
                duration: 10,
            },
            {
                title: 'Variables and Data Types',
                contentUrl: 'http://example.com/js_variables.mp4',
                sectionId: sections[0]._id,
                contentType: 'video',
                duration: 15,
            },
        ]);

        // Tạo một số User
        const users = await User.insertMany([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: await bcrypt.hash('password123', 10),
                role: 'user',
                enrolledCourses: [courses[0]._id],
                dateOfBirth: new Date('1990-01-01'), // Ngày tháng năm sinh
                address: '123 Main St, Anytown, USA', // Địa chỉ
                phoneNumber: '123-456-7890', // Số điện thoại
                profileImage: 'http://example.com/images/john_doe.jpg', // Hình ảnh đại diện
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: await bcrypt.hash('password456', 10),
                role: 'admin',
                enrolledCourses: [courses[1]._id, courses[2]._id],
                dateOfBirth: new Date('1985-05-15'), // Ngày tháng năm sinh
                address: '456 Elm St, Othertown, USA', // Địa chỉ
                phoneNumber: '987-654-3210', // Số điện thoại
                profileImage: 'http://example.com/images/jane_smith.jpg', // Hình ảnh đại diện
            },
        ]);

        // Tạo một số Cart cho người dùng đầu tiên
        const cart = await Cart.create({
            userId: users[0]._id,
            items: [{ courseId: courses[0]._id, quantity: 1 }],
            totalAmount: 100,
        });

        // Tạo một số Order cho người dùng đầu tiên
        const orders = await Order.insertMany([
            { userId: users[0]._id, courses: [courses[0]._id], totalAmount: 100, status: 'completed' },
            { userId: users[1]._id, courses: [courses[1]._id, courses[2]._id], totalAmount: 270, status: 'pending' },
        ]);

        console.log('Data seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

// Chạy hàm seedData
seedData();
