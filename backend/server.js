const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const { verifyToken, verifyRole } = require('./controllers/authMiddleware');
const sectionRoutes = require('./routes/sectionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json()); 

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));



// Route không yêu cầu xác thực
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);

// Route chỉ dành cho user

// Route chỉ dành cho admin


// Route cho cả admin và user

app.use('/api/course', courseRoutes);
app.use('/api/section', sectionRoutes);
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
