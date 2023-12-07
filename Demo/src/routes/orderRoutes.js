const express = require('express');
const router = express.Router();
const { createOrder, getOrder, updateOrder, deleteOrder, getAllOrders } = require('../controllers/orderController');

router.get('/orders', async (req, res) => {
    try {
        const orders = await getAllOrders(); 
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
});

router.get('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await getOrder(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
});

router.post('/orders', async (req, res) => {
    const { orderId, productName, quantity } = req.body;
    
    if (!orderId || !productName || !quantity) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const order = {
        orderId,
        productName,
        quantity
    };

    try {
        const result = await createOrder(order);
        if (result.success) {
            res.status(201).json({ message: 'Order created successfully' });
        } else {
            res.status(500).json({ message: 'Failed to create order', error: result.error });
        }
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
});

router.put('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    const { productName, quantity } = req.body;

    const order = {
        orderId,
        productName,
        quantity
    };

    try {
        const result = await updateOrder(order);
        if (!result) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
});

router.delete('/orders/:id', async (req, res) => {
    const orderId = req.params.id;

    try {
        const result = await deleteOrder(orderId);
        if (!result.success) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
});

module.exports = router;
