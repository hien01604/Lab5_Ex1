// routes/users.js

const express = require('express');
const { User } = require('../models');
const router = express.Router();

// Tạo User mới
router.post('/users', async (req, res) => {
    const { full_name, address } = req.body;
    try {
        const user = await User.create({ full_name, address });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy danh sách Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cập nhật User
router.put('/users/:id', async (req, res) => {
    const { full_name, address } = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        user.full_name = full_name;
        user.address = address;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Xóa User
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
