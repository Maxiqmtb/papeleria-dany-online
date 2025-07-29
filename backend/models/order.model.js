// backend/models/order.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    // Referencia al usuario que realizó el pedido
    user: {
        type: Schema.Types.ObjectId, // Tipo de dato para IDs de MongoDB
        ref: 'User', // Hace referencia al modelo 'User'
        required: true
    },
    // Array de productos en el pedido
    products: [
        {
            product: {
                type: Schema.Types.ObjectId, // Referencia al modelo 'Product'
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true, default: 'México' }
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;