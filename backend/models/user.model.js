const mongoose = require('mongoose');
const scrypt = require('scrypt-js'); // CAMBIO: Usaremos scrypt-js

// Define el esquema (estructura) de un usuario
const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Puedes añadir más campos aquí, como rol (admin/cliente), dirección, etc.
}, {
    timestamps: true // Para registrar cuándo se creó y actualizó el usuario
});

// Middleware de Mongoose para encriptar la contraseña antes de guardarla
// CAMBIO: Ahora usamos scrypt.hash
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        // scrypt-js devuelve un buffer, lo convertimos a string base64 para guardarlo
        this.password = (await scrypt.scrypt(
            Buffer.from(this.password, 'utf8'), // Contraseña como Buffer
            Buffer.from('sal_secreta_unica', 'utf8'), // CAMBIO: Usa una "sal" secreta y única (guárdala en .env en producción)
            16384, // N (factor de costo de CPU)
            8,     // r (tamaño de bloque)
            1,     // p (paralelización)
            64     // dkLen (longitud de la clave derivada)
        )).toString('base64');
    }
    next();
});

// Método para comparar contraseñas (se usará al iniciar sesión)
// CAMBIO: Ahora usamos scrypt.verify
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // La "sal" debe ser la misma que usaste para hashear
        const hashedCandidatePassword = (await scrypt.scrypt(
            Buffer.from(candidatePassword, 'utf8'),
            Buffer.from('sal_secreta_unica', 'utf8'), // CAMBIO: Misma "sal" que usaste para hashear
            16384, 8, 1, 64
        )).toString('base64');

        return hashedCandidatePassword === this.password;
    } catch (error) {
        console.error("Error al comparar contraseña con scrypt-js:", error);
        return false;
    }
};


const User = mongoose.model('User', userSchema);

module.exports = User;