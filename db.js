// db/db.js

const mysql = require('mysql2');

// Kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',   // mặc định là root
    password: '',   // mật khẩu trống nếu không thay đổi
    database: 'lab5_ex1', // tên cơ sở dữ liệu
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;
