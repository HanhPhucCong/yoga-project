const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const crypto = require("crypto");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user.toObject();
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    dateOfBirth,
    address,
    phoneNumber,
    profileImage,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      address,
      phoneNumber,
      profileImage,
    });
    await newUser.save();
    return res.status(201).json({
      message: "Tài khoản đã được tạo thành công.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại." });
  }
};

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email không tồn tại.' });
        }
        const token = crypto.randomBytes(3).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 300000; 
    
        await user.save();
    
        await sendEmail(email, 'Mã khôi phục mật khẩu', `Mã của bạn là: ${token}`);
    
        return res.status(200).json({ message: 'Mã khôi phục mật khẩu đã được gửi đến email.' });
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại.' });
    }
};
const resetPassword = async (req, res) => {
    const { token, password } = req.body; 

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Mã không hợp lệ hoặc đã hết hạn.' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Đổi mật khẩu thành công.' });
    } catch (error) {
        console.error('Lỗi khi đổi mật khẩu:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi.' });
    }
};
  


module.exports = {
  getUserById,
  createUser,
  forgotPassword,
  resetPassword,
};
