// backend/routes/order.routes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware'); // IMPORTANTE: Esta línea ya NO debe estar comentada

// Ruta para crear un nuevo pedido (requiere autenticación)
router.post('/', authMiddleware, orderController.createOrder);

// Ruta para obtener todos los pedidos de un usuario (requiere autenticación)
router.get('/my-orders', authMiddleware, orderController.getUserOrders);

// Ruta para obtener los detalles de un pedido específico por su ID (requiere autenticación)
router.get('/:id', authMiddleware, orderController.getOrderById);

// (Opcional) Ruta para actualizar el estado de un pedido (idealmente solo para administradores)
router.put('/:id/status', authMiddleware, orderController.updateOrderStatus);

module.exports = router;