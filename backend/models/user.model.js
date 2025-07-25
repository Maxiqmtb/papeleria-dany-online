const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Para encriptar contraseñas

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Puedes añadir más campos aquí, como rol (admin/cliente), dirección, etc.
}, {
    timestamps: true // Para registrar cuándo se creó y actualizó el usuario
});

// Middleware de Mongoose para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // 10 es el costo del hash
    }
    next();
});

// Método para comparar contraseñas (se usará al iniciar sesión)
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;