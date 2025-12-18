// models/index.js

const { Sequelize, DataTypes } = require('sequelize');

// Khởi tạo kết nối tới cơ sở dữ liệu MySQL
const sequelize = new Sequelize('lab5_ex1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Định nghĩa các model
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Đảm bảo khóa chính là user_id
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registration_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'users',  // Đảm bảo rằng tên bảng đúng với cơ sở dữ liệu
    timestamps: false,   // Tắt timestamps (nếu bạn không cần cột createdAt, updatedAt)
    createdAt: false,    // Không sử dụng cột createdAt
    updatedAt: false     // Không sử dụng cột updatedAt
});

// Các model khác như Product, ShoppingCart, CartItem sẽ tương tự
const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    manufacturing_date: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'products',
    timestamps: false,
});

// Đồng bộ hóa cơ sở dữ liệu
sequelize.sync({ force: true })
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.error('Error syncing database:', err));

module.exports = { User, Product, sequelize };
