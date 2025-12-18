// routes/extra.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const nodemailer = require('nodemailer');  // Import Nodemailer
const { User } = require('../models');
const router = express.Router();

// Cấu hình multer để lưu trữ ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Lưu vào thư mục uploads/
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Tên file sẽ là timestamp + phần mở rộng gốc của file
    }
});

const upload = multer({ storage: storage });

// 3.1. Endpoint để nhận và lưu ảnh
router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// 3.2. Endpoint để hiển thị ảnh đã lưu
router.get('/images/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    res.sendFile(filePath);
});

// 4. Endpoint để fetch dữ liệu từ JSONPlaceholder và lưu vào cơ sở dữ liệu
router.post('/import-users', async (req, res) => {
    try {
        // Fetch dữ liệu từ API JSONPlaceholder
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;

        // Lưu vào cơ sở dữ liệu
        for (const user of users) {
            await User.create({
                user_id: user.id,  // Hoặc tạo mới nếu không có id tương ứng
                full_name: user.name,
                address: user.address.street,
                registration_date: new Date(),  // Hoặc bạn có thể tạo một thời gian mới
            });
        }

        res.json({ message: 'Users imported successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Endpoint gửi email
router.post('/send-email', async (req, res) => {
    const { toEmail, subject, textContent } = req.body;  // Nhận thông tin email từ body của request

    // Kiểm tra nếu thiếu thông tin
    if (!toEmail || !subject || !textContent) {
        return res.status(400).json({ error: 'Missing required fields (toEmail, subject, textContent)' });
    }

    try {
        // Cấu hình Nodemailer để gửi email qua Gmail (hoặc bạn có thể sử dụng dịch vụ khác như SendGrid)
        const transporter = nodemailer.createTransport({
            service: 'gmail',  // Sử dụng Gmail làm dịch vụ gửi email
            auth: {
                user: '22520422@gm.uit.edu.vn',  // Thay bằng email của bạn
                pass: 'PhamThiMinhHien010604',   // Thay bằng mật khẩu email của bạn
            },
        });

        // Cấu hình email
        const mailOptions = {
            from: '22520422@gm.uit.edu.vn',  // Địa chỉ email người gửi
            to: toEmail,                   // Địa chỉ email người nhận
            subject: subject,              // Tiêu đề email
            text: textContent,             // Nội dung email
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;
