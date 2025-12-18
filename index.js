// index.js

const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');  // Import user routes
const extraRoutes = require('./routes/extra');  // Import extra routes (upload image, import users)
const app = express();

app.use(bodyParser.json());  // Middleware để xử lý JSON requests

// Đăng ký các route
app.use('/api/users', usersRoutes);  // Các API liên quan đến User
app.use('/api/extra', extraRoutes);  // Các API liên quan đến Upload Image và Import Users

// Khởi động server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
