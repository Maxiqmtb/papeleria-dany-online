const mongoose = require('mongoose');

// Define el esquema (estructura) de un producto
const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Mantenemos tu ID numérico
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    subCategoria: { type: String, required: true },
    imagen: { type: String, required: true },
    etiqueta: { type: String, default: null }, // 'Oferta', 'Nuevo', 'Popular', etc. (puede ser nulo)
    vecesComprado: { type: Number, default: 0 } // Para la popularidad
}, {
    timestamps: true // Esto añade automáticamente campos 'createdAt' y 'updatedAt'
});

// Crea el modelo a partir del esquema. 'Product' será el nombre de tu colección en MongoDB (se pluralizará a 'products').
const Product = mongoose.model('Product', productSchema);

module.exports = Product;