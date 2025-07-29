// backend/models/product.model.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    subCategoria: {
        type: String,
        trim: true
    },
    imagen: {
        type: String,
        trim: true
    },
    etiqueta: {
        type: String,
        trim: true
    },
    vecesComprado: {
        type: Number,
        default: 0
    },
    // CAMBIO CLAVE: Campo de stock para la gestión de inventario
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;