// routes/products.js

const express = require('express');
const { Product } = require('../models');
const router = express.Router();

// Create Product
router.post('/products', async (req, res) => {
    const { product_name, price, manufacturing_date } = req.body;
    try {
        const product = await Product.create({ product_name, price, manufacturing_date });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View all Products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Product
router.put('/products/:id', async (req, res) => {
    const { product_name, price, manufacturing_date } = req.body;
    try {
        const product = await Product.findByPk(req.params.id);
        product.product_name = product_name;
        product.price = price;
        product.manufacturing_date = manufacturing_date;
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Product
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
