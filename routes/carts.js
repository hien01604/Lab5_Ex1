// routes/carts.js

const express = require('express');
const { ShoppingCart, CartItem } = require('../models');
const router = express.Router();

// Create ShoppingCart
router.post('/carts', async (req, res) => {
    const { user_id, status } = req.body;
    try {
        const cart = await ShoppingCart.create({ user_id, status });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View all Carts
router.get('/carts', async (req, res) => {
    try {
        const carts = await ShoppingCart.findAll();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update ShoppingCart
router.put('/carts/:id', async (req, res) => {
    const { status } = req.body;
    try {
        const cart = await ShoppingCart.findByPk(req.params.id);
        cart.status = status;
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete ShoppingCart
router.delete('/carts/:id', async (req, res) => {
    try {
        const cart = await ShoppingCart.findByPk(req.params.id);
        await cart.destroy();
        res.json({ message: 'ShoppingCart deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
