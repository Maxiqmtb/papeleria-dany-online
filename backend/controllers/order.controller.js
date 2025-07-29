// backend/controllers/order.controller.js

const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

// Controlador para crear un nuevo pedido
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id; // Obtenemos el ID del usuario del token
        const { products, shippingAddress, paymentDetails } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        let totalAmount = 0;
        const productsForOrder = [];

        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Producto con ID ${item.productId} no encontrado.` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Stock insuficiente para ${product.nombre}. Disponibles: ${product.stock}` });
            }

            productsForOrder.push({
                product: product._id,
                name: product.nombre,
                quantity: item.quantity,
                price: product.precio
            });
            totalAmount += product.precio * item.quantity;
        }

        const paymentStatus = paymentDetails ? 'paid' : 'pending'; // Placeholder para la pasarela de pago

        const newOrder = new Order({
            user: userId,
            products: productsForOrder,
            totalAmount: totalAmount,
            shippingAddress: shippingAddress || (user.defaultShippingAddress ? user.defaultShippingAddress : {
                street: 'Calle Desconocida', city: 'Ciudad Desconocida', state: 'Estado Desconocido', zipCode: '00000', country: 'México'
            }),
            paymentStatus: paymentStatus,
            orderStatus: 'pending'
        });

        await newOrder.save();

        // Descontar el stock de los productos
        for (const item of products) {
            await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
        }

        res.status(201).json({ message: 'Pedido creado con éxito', order: newOrder });

    } catch (error) {
        console.error('Error al crear el pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear el pedido.', error: error.message });
    }
};

// Controlador para obtener los pedidos de un usuario
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
                                  .populate('products.product', 'nombre precio imagen')
                                  .sort({ createdAt: -1 });

        res.status(200).json({ orders });

    } catch (error) {
        console.error('Error al obtener los pedidos del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener los pedidos.', error: error.message });
    }
};

// Controlador para obtener un pedido por su ID
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id;

        const order = await Order.findOne({ _id: orderId, user: userId })
                                 .populate('products.product', 'nombre precio imagen');

        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado o no pertenece a este usuario.' });
        }

        res.status(200).json({ order });

    } catch (error) {
        console.error('Error al obtener el detalle del pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener el detalle del pedido.', error: error.message });
    }
};

// Controlador para actualizar el estado de un pedido (ej. solo para administradores)
exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { newStatus } = req.body;

        // Idealmente, aquí se verificaría el rol de administrador del usuario
        // if (req.user.role !== 'admin') { return res.status(403).json({ message: 'Acceso denegado.' }); }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus: newStatus },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Pedido no encontrado.' });
        }

        if (newStatus === 'cancelled') {
            for (const item of updatedOrder.products) {
                await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
            }
        }

        res.status(200).json({ message: 'Estado del pedido actualizado con éxito', order: updatedOrder });

    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el estado del pedido.', error: error.message });
    }
};