// AÑADIDO: Cargar variables de entorno al inicio del script
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); // Asegurado que la importación de mongoose sea correcta
const cors = require('cors'); // Para permitir solicitudes desde tu frontend
const Product = require('./models/product.model'); // Importa el modelo de Producto

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL || process.env.MONGO_URI;

// --- FUNCIÓN PARA CARGAR PRODUCTOS INICIALES (¡AHORA ESTÁ AQUÍ, ANTES DE SER LLAMADA!) ---
// Esta función está pensada para ser ejecutada UNA SOLA VEZ para poblar tu DB inicialmente.
// Una vez que tengas productos en tu DB, NO necesitas ejecutarla más.
async function cargarProductosIniciales() {
    try {
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            console.log('📦 La base de datos de productos está vacía. Cargando datos iniciales...');
            const initialProducts = [
                // ======================================================================
                // === ¡¡¡ AQUÍ ESTÁ SU ARRAY DE 180 PRODUCTOS COMPLETO !!! ===
                // ======================================================================
                { id: 1, nombre: "Lápiz Duo", precio: 55, categoria: "Escolar", subCategoria: "Lápices Bicolor", imagen: "https://i.postimg.cc/90xc6sg3/download.png", etiqueta: "Nuevo", vecesComprado: 45 },
                { id: 2, nombre: "Cuaderno Profesional Scribe", precio: 30, categoria: "Escolar", subCategoria: "Cuadernos Espiral", imagen: "https://i.postimg.cc/zvQ9SNPf/download.png", etiqueta: "Oferta", vecesComprado: 32 },
                { id: 3, nombre: "Caja de colores prismacolor", precio: 220, categoria: "Arte", subCategoria: "Lápices de Colores", imagen: "https://i.postimg.cc/jqGT7QV4/download.jpg", vecesComprado: 28 },
                { id: 4, nombre: "Tijeras escolares Mae", precio: 15, categoria: "Escolar", subCategoria: "Tijeras", imagen: "https://i.postimg.cc/6ptDrMMn/7502212171613.jpg", vecesComprado: 39 },
                { id: 5, nombre: "Resaltadores Pastel x4", precio: 55, categoria: "Oficina", subCategoria: "Marcatextos", imagen: "https://cdn-icons-png.flaticon.com/512/3765/3765457.png", etiqueta: "Popular", vecesComprado: 52 },
                { id: 6, nombre: "Bolígrafos x10 colores", precio: 50, categoria: "Oficina", subCategoria: "Bolígrafos de Gel", imagen: "https://cdn-icons-png.flaticon.com/512/3602/3602370.png", vecesComprado: 47 },
                { id: 7, nombre: "Papel fotográfico A4", precio: 120, categoria: "Oficina", subCategoria: "Papel Fotográfico", imagen: "https://cdn-icons-png.flaticon.com/512/4097/4097691.png", etiqueta: "Oferta", vecesComprado: 18 },
                { id: 8, nombre: "Acuarelas escolares", precio: 30, categoria: "Arte", subCategoria: "Acuarelas", imagen: "https://cdn-icons-png.flaticon.com/512/3580/3580019.png", vecesComprado: 23 },
                { id: 9, nombre: "Carpetas Plásticas x5", precio: 40, categoria: "Oficina", subCategoria: "Carpetas y Separadores", imagen: "https://cdn-icons-png.flaticon.com/512/2922/2922523.png", vecesComprado: 29 },
                { id: 10, nombre: "Pegamento en barra", precio: 15, categoria: "Escolar", subCategoria: "Pegamentos", imagen: "https://cdn-icons-png.flaticon.com/512/891/891462.png", vecesComprado: 41 },
                { id: 11, nombre: "Corrector líquido", precio: 20, categoria: "Oficina", subCategoria: "Correctores", imagen: "https://cdn-icons-png.flaticon.com/512/2750/2750683.png", vecesComprado: 27 },
                { id: 12, nombre: "Caja de clips", precio: 10, categoria: "Oficina", subCategoria: "Clips y Pines", imagen: "https://cdn-icons-png.flaticon.com/512/606/606807.png", vecesComprado: 35 },
                { id: 13, nombre: "Plumones de pizarra", precio: 35, categoria: "Oficina", subCategoria: "Artículos para Pizarrón", imagen: "https://cdn-icons-png.flaticon.com/512/2772/2772972.png", vecesComprado: 19 },
                { id: 14, nombre: "Regla de 30 cm", precio: 12, categoria: "Escolar", subCategoria: "Juegos de Geometría y Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3500/3500450.png", vecesComprado: 38 },
                { id: 15, nombre: "Compás metálico", precio: 38, categoria: "Escolar", subCategoria: "Juegos de Geometría y Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3833/3833921.png", vecesComprado: 16 },
                { id: 16, nombre: "Caja de grapas", precio: 15, categoria: "Oficina", subCategoria: "Grapas", imagen: "https://cdn-icons-png.flaticon.com/512/3567/3567616.png", vecesComprado: 22 },
                { id: 17, nombre: "Set de pinceles", precio: 60, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/2807/2807585.png", vecesComprado: 14 },
                { id: 18, nombre: "Notas adhesivas", precio: 25, categoria: "Oficina", subCategoria: "Notas Adhesivas", imagen: "https://cdn-icons-png.flaticon.com/512/4240/4240610.png", vecesComprado: 31 },
                { id: 19, nombre: "Calculadora científica", precio: 250, categoria: "Escolar", subCategoria: "Calculadoras Científicas", imagen: "https://cdn-icons-png.flaticon.com/512/1593/1593788.png", etiqueta: "Popular", vecesComprado: 42 },
                { id: 20, nombre: "Mochila escolar", precio: 350, categoria: "Escolar", subCategoria: "Mochilas Escolares", imagen: "https://cdn-icons-png.flaticon.com/512/2742/2742671.png", vecesComprado: 37 },
                { id: 21, nombre: "Estuche geométrico", precio: 45, categoria: "Escolar", subCategoria: "Juegos de Geometría y Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png", vecesComprado: 28 },
                { id: 22, nombre: "Marcadores permanentes x8", precio: 65, categoria: "Oficina", subCategoria: "Marcadores Permanentes", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176272.png", vecesComprado: 33 },
                { id: 23, nombre: "Block de dibujo A3", precio: 40, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652191.png", vecesComprado: 19 },
                { id: 24, nombre: "Goma para borrar", precio: 8, categoria: "Escolar", subCategoria: "Gomas de Borrar", imagen: "https://cdn-icons-png.flaticon.com/512/2743/2743158.png", vecesComprado: 56 },
                { id: 25, nombre: "Lápices de colores x24", precio: 85, categoria: "Arte", subCategoria: "Lápices de Colores", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176163.png", vecesComprado: 29 },
                { id: 26, nombre: "Portaminas 0.5mm", precio: 25, categoria: "Oficina", subCategoria: "Lapiceros", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176187.png", vecesComprado: 31 },
                { id: 27, nombre: "Tinta para pluma fuente", precio: 45, categoria: "Oficina", subCategoria: "Tintas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176289.png", vecesComprado: 12 },
                { id: 28, nombre: "Organizador de escritorio", precio: 120, categoria: "Oficina", subCategoria: "Organizadores", imagen: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png", vecesComprado: 18 },
                { id: 29, nombre: "Sobres manila x50", precio: 55, categoria: "Oficina", subCategoria: "Sobres", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652287.png", vecesComprado: 22 },
                { id: 30, nombre: "Cinta adhesiva", precio: 15, categoria: "Oficina", subCategoria: "Cintas Transparentes", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176264.png", vecesComprado: 39 },
                { id: 31, nombre: "Tóner para impresora", precio: 450, categoria: "Oficina", subCategoria: "Cómputo e Impresión", imagen: "https://cdn-icons-png.flaticon.com/512/3659/3659898.png", vecesComprado: 9 },
                { id: 32, nombre: "Libreta espiral", precio: 22, categoria: "Escolar", subCategoria: "Cuadernos Espiral", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176287.png", vecesComprado: 47 },
                { id: 33, nombre: "Grapadora metálica", precio: 65, categoria: "Oficina", subCategoria: "Engrapadoras y Desengrapadoras", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176185.png", vecesComprado: 24 },
                { id: 34, nombre: "Sacapuntas metálico", precio: 18, categoria: "Escolar", subCategoria: "Sacapuntas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176276.png", vecesComprado: 41 },
                { id: 35, nombre: "Separadores índice", precio: 30, categoria: "Oficina", subCategoria: "Carpetas y Separadores", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176274.png", vecesComprado: 27 },
                { id: 36, nombre: "Pizarra blanca", precio: 180, categoria: "Oficina", subCategoria: "Muebles y Pizarrones", imagen: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png", vecesComprado: 13 },
                { id: 37, nombre: "Rotuladores pizarra x4", precio: 75, categoria: "Oficina", subCategoria: "Artículos para Pizarrón", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176281.png", vecesComprado: 21 },
                { id: 38, nombre: "Archivador de palanca", precio: 95, categoria: "Oficina", subCategoria: "Archivadores", imagen: "https://cdn-icons-png.flaticon.com/512/2933/2933240.png", vecesComprado: 17 },
                { id: 39, nombre: "Carpeta con argollas", precio: 35, categoria: "Oficina", subCategoria: "Carpetas y Separadores", imagen: "https://cdn-icons-png.flaticon.com/512/2933/2933241.png", vecesComprado: 29 },
                { id: 40, nombre: "Papel bond carta x500", precio: 110, categoria: "Oficina", subCategoria: "Papel Bond Carta", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652289.png", vecesComprado: 36 },
                { id: 41, nombre: "Tijeras de oficina", precio: 45, categoria: "Oficina", subCategoria: "Tijeras", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176278.png", vecesComprado: 25 },
                { id: 42, nombre: "Lápiz adhesivo", precio: 28, categoria: "Escolar", subCategoria: "Pegamentos", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176183.png", vecesComprado: 31 },
                { id: 43, nombre: "Plumón permanente", precio: 18, categoria: "Oficina", subCategoria: "Marcadores Permanentes", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176282.png", vecesComprado: 42 },
                { id: 44, nombre: "Carpeta de proyectos", precio: 25, categoria: "Escolar", subCategoria: "Carpetas y Separadores", imagen: "https://cdn-icons-png.flaticon.com/512/2933/2933244.png", vecesComprado: 28 },
                { id: 45, nombre: "Borrador para tinta", precio: 22, categoria: "Escolar", subCategoria: "Gomas de Borrar", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176164.png", vecesComprado: 19 },
                { id: 46, nombre: "Lápiz de grafito 2B", precio: 5, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176188.png", vecesComprado: 63 },
                { id: 47, nombre: "Cuaderno de dibujo", precio: 65, categoria: "Arte", subCategoria: "Cuadernos de Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652197.png", vecesComprado: 22 },
                { id: 48, nombre: "Tabla de dibujo", precio: 120, categoria: "Arte", subCategoria: "Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652195.png", vecesComprado: 14 },
                { id: 49, nombre: "Escuadra 45°", precio: 15, categoria: "Escolar", subCategoria: "Juegos de Geometría y Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176179.png", vecesComprado: 37 },
                { id: 50, nombre: "Transportador 180°", precio: 12, categoria: "Escolar", subCategoria: "Juegos de Geometría y Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176285.png", vecesComprado: 34 },
                { id: 51, nombre: "Cartulina negra", precio: 8, categoria: "Arte", subCategoria: "Cartulinas", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652199.png", vecesComprado: 27 },
                { id: 52, nombre: "Papel crepe x10", precio: 45, categoria: "Arte", subCategoria: "Papeles Extendidos", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652200.png", vecesComprado: 18 },
                { id: 53, nombre: "Témperas x6", precio: 75, categoria: "Arte", subCategoria: "Pintura Gouache", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176284.png", vecesComprado: 21 },
                { id: 54, nombre: "Pincel redondo #6", precio: 25, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176283.png", vecesComprado: 23 },
                { id: 55, nombre: "Block acuarela A4", precio: 55, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 16 },
                { id: 56, nombre: "Cutter profesional", precio: 35, categoria: "Oficina", subCategoria: "Cutters", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176171.png", vecesComprado: 29 },
                { id: 57, nombre: "Lápiz de carbón", precio: 18, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176189.png", vecesComprado: 14 },
                { id: 58, nombre: "Gis blanco x12", precio: 15, categoria: "Escolar", subCategoria: "Artículos para Pizarrón", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176177.png", vecesComprado: 22 },
                { id: 59, nombre: "Borrador pizarra", precio: 25, categoria: "Oficina", subCategoria: "Artículos para Pizarrón", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176165.png", vecesComprado: 19 },
                { id: 60, nombre: "Masking tape", precio: 30, categoria: "Arte", subCategoria: "Masking Tape", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176198.png", vecesComprado: 26 },
                { id: 61, nombre: "Pegamento líquido", precio: 22, categoria: "Escolar", subCategoria: "Pegamento Blanco", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176184.png", vecesComprado: 33 },
                { id: 62, nombre: "Corrector en cinta", precio: 35, categoria: "Oficina", subCategoria: "Correctores", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176168.png", vecesComprado: 24 },
                { id: 63, nombre: "Post-it x3", precio: 40, categoria: "Oficina", subCategoria: "Notas Adhesivas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176280.png", vecesComprado: 31 },
                { id: 64, nombre: "Sujetapapeles x50", precio: 18, categoria: "Oficina", subCategoria: "Clips y Pines", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176279.png", vecesComprado: 28 },
                { id: 65, nombre: "Engrapadora mini", precio: 45, categoria: "Oficina", subCategoria: "Engrapadoras y Desengrapadoras", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176175.png", vecesComprado: 21 },
                { id: 66, nombre: "Tinta china", precio: 55, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176190.png", vecesComprado: 12 },
                { id: 67, nombre: "Lápiz pastel x12", precio: 95, categoria: "Arte", subCategoria: "Lápices de Colores", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176191.png", vecesComprado: 15 },
                { id: 68, nombre: "Papel kraft", precio: 35, categoria: "Arte", subCategoria: "Papeles Extendidos", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652201.png", vecesComprado: 19 },
                { id: 69, nombre: "Plumón de aceite", precio: 28, categoria: "Arte", subCategoria: "Marcadores para Colorear", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176286.png", vecesComprado: 17 },
                { id: 70, nombre: "Lápiz acuarelable", precio: 22, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176166.png", vecesComprado: 14 },
                { id: 71, nombre: "Papel charol x10", precio: 45, categoria: "Arte", subCategoria: "Papeles Extendidos", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652202.png", vecesComprado: 18 },
                { id: 72, nombre: "Goma eva x5", precio: 65, categoria: "Arte", subCategoria: "Foamy", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652203.png", vecesComprado: 16 },
                { id: 73, nombre: "Silicona líquida", precio: 35, categoria: "Arte", subCategoria: "Silicón y Pistolas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176186.png", vecesComprado: 13 },
                { id: 74, nombre: "Crayones x24", precio: 65, categoria: "Escolar", subCategoria: "Crayones", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176169.png", vecesComprado: 27 },
                { id: 75, nombre: "Plastilina x12", precio: 55, categoria: "Escolar", subCategoria: "Masas Modeladoras", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176288.png", vecesComprado: 22 },
                { id: 76, nombre: "Pintura acrílica x6", precio: 85, categoria: "Arte", subCategoria: "Pintura Acrílica", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176167.png", vecesComprado: 15 },
                { id: 77, nombre: "Pincel angular #8", precio: 35, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176288.png", vecesComprado: 13 },
                { id: 78, nombre: "Lienzo 30x40cm", precio: 75, categoria: "Arte", subCategoria: "Lienzos y Bastidores", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652196.png", vecesComprado: 11 },
                { id: 79, nombre: "Aerógrafo básico", precio: 350, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176159.png", vecesComprado: 7 },
                { id: 80, nombre: "Rodillo espuma", precio: 25, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176288.png", vecesComprado: 14 },
                { id: 81, nombre: "Paleta mezcladora", precio: 45, categoria: "Arte", subCategoria: "Godetes y Paletas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176288.png", vecesComprado: 12 },
                { id: 82, nombre: "Caballete de mesa", precio: 120, categoria: "Arte", subCategoria: "Lienzos y Bastidores", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652193.png", vecesComprado: 9 },
                { id: 83, nombre: "Block óleo A3", precio: 65, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 10 },
                { id: 84, nombre: "Espátula pintura", precio: 35, categoria: "Arte", subCategoria: "Espátulas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176174.png", vecesComprado: 11 },
                { id: 85, nombre: "Barniz mate", precio: 55, categoria: "Arte", subCategoria: "Aceites y Solventes", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176160.png", vecesComprado: 8 },
                { id: 86, nombre: "Carboncillo x6", precio: 45, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176162.png", vecesComprado: 12 },
                { id: 87, nombre: "Sanguina x6", precio: 50, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176275.png", vecesComprado: 10 },
                { id: 88, nombre: "Goma lápiz", precio: 15, categoria: "Arte", subCategoria: "Gomas de Borrar", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176173.png", vecesComprado: 14 },
                { id: 89, nombre: "Fijador aerosol", precio: 65, categoria: "Arte", subCategoria: "Aceites y Solventes", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176172.png", vecesComprado: 9 },
                { id: 90, nombre: "Plantilla letras", precio: 35, categoria: "Arte", subCategoria: "Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176288.png", vecesComprado: 13 },
                { id: 91, nombre: "Tablero dibujo A2", precio: 150, categoria: "Arte", subCategoria: "Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652195.png", vecesComprado: 8 },
                { id: 92, nombre: "Escalímetro", precio: 55, categoria: "Arte", subCategoria: "Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176178.png", vecesComprado: 11 },
                { id: 93, nombre: "Rotring 0.3mm", precio: 180, categoria: "Arte", subCategoria: "Estilógrafos", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176288.png", vecesComprado: 7 },
                { id: 94, nombre: "Tinta sepia", precio: 65, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176192.png", vecesComprado: 9 },
                { id: 95, nombre: "Papel pergamino", precio: 35, categoria: "Arte", subCategoria: "Papeles Especiales", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652204.png", vecesComprado: 12 },
                { id: 96, nombre: "Punta pincel", precio: 45, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176288.png", vecesComprado: 8 },
                { id: 97, nombre: "Pegamento en spray", precio: 85, categoria: "Arte", subCategoria: "Pegamentos Especiales", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176182.png", vecesComprado: 7 },
                { id: 98, nombre: "Cinta washi x3", precio: 45, categoria: "Arte", subCategoria: "Cintas Especiales", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176199.png", vecesComprado: 15 },
                { id: 99, nombre: "Papel acuarela A2", precio: 95, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 9 },
                { id: 100, nombre: "Set acuarelas x24", precio: 220, categoria: "Arte", subCategoria: "Acuarelas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176161.png", etiqueta: "Nuevo", vecesComprado: 18 },
                { id: 101, nombre: "Marcadores fluorescentes x6", precio: 65, categoria: "Escolar", subCategoria: "Marcatextos", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176170.png", vecesComprado: 42 },
                { id: 102, nombre: "Block notas adhesivas", precio: 28, categoria: "Oficina", subCategoria: "Notas Adhesivas", imagen: "https://cdn-icons-png.flaticon.com/512/4240/4240610.png", vecesComprado: 37 },
                { id: 103, nombre: "Tinta china color", precio: 75, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176193.png", vecesComprado: 15 },
                { id: 104, nombre: "Portadocumentos", precio: 45, categoria: "Oficina", subCategoria: "Portadocumentos", imagen: "https://cdn-icons-png.flaticon.com/512/2933/2933243.png", vecesComprado: 28 },
                { id: 105, nombre: "Lápiz tinta blanca", precio: 35, categoria: "Arte", subCategoria: "Marcadores para Colorear", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176194.png", vecesComprado: 19 },
                { id: 106, nombre: "Calculadora básica", precio: 85, categoria: "Escolar", subCategoria: "Calculadoras de Bolsillo", imagen: "https://cdn-icons-png.flaticon.com/512/1593/1593788.png", vecesComprado: 31 },
                { id: 107, nombre: "Goma para acuarela", precio: 25, categoria: "Arte", subCategoria: "Gomas de Borrar", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176164.png", vecesComprado: 14 },
                { id: 108, nombre: "Clip metálico x100", precio: 12, categoria: "Oficina", subCategoria: "Clips y Pines", imagen: "https://cdn-icons-png.flaticon.com/512/606/606807.png", vecesComprado: 45 },
                { id: 109, nombre: "Papel milimetrado", precio: 35, categoria: "Escolar", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652289.png", vecesComprado: 22 },
                { id: 110, nombre: "Pincel abanico", precio: 40, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 13 },
                { id: 111, nombre: "Sobre manila grande", precio: 5, categoria: "Oficina", subCategoria: "Sobres", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652287.png", vecesComprado: 38 },
                { id: 112, nombre: "Cuaderno cuadriculado", precio: 28, categoria: "Escolar", subCategoria: "Cuadernos Espiral", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176287.png", vecesComprado: 47 },
                { id: 113, nombre: "Cutter seguridad", precio: 55, categoria: "Oficina", subCategoria: "Cutters", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176171.png", vecesComprado: 24 },
                { id: 114, nombre: "Lápiz portaminas 0.7", precio: 30, categoria: "Escolar", subCategoria: "Lapiceros", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176187.png", vecesComprado: 33 },
                { id: 115, nombre: "Grapas #10", precio: 15, categoria: "Oficina", subCategoria: "Grapas", imagen: "https://cdn-icons-png.flaticon.com/512/3567/3567616.png", vecesComprado: 29 },
                { id: 116, nombre: "Tinta para sello", precio: 45, categoria: "Oficina", subCategoria: "Cojines y Sellos", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176195.png", vecesComprado: 17 },
                { id: 117, nombre: "Papel calca", precio: 40, categoria: "Arte", subCategoria: "Papel Carbón", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652288.png", vecesComprado: 14 },
                { id: 118, nombre: "Regla T", precio: 120, categoria: "Arte", subCategoria: "Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176285.png", vecesComprado: 11 },
                { id: 119, nombre: "Borrador migajón", precio: 25, categoria: "Arte", subCategoria: "Gomas de Borrar", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176165.png", vecesComprado: 16 },
                { id: 120, nombre: "Marcador pizarra", precio: 22, categoria: "Oficina", subCategoria: "Artículos para Pizarrón", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176281.png", vecesComprado: 34 },
                { id: 121, nombre: "Lápiz grafito 6B", precio: 18, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176189.png", vecesComprado: 23 },
                { id: 122, nombre: "Sujetador documentos", precio: 35, categoria: "Oficina", subCategoria: "Agarrapapeles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176279.png", vecesComprado: 27 },
                { id: 123, nombre: "Cuaderno espiral", precio: 25, categoria: "Escolar", subCategoria: "Cuadernos Espiral", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176287.png", vecesComprado: 49 },
                { id: 124, nombre: "Tijeras decorativas", precio: 65, categoria: "Arte", subCategoria: "Tijeras", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176278.png", vecesComprado: 18 },
                { id: 125, nombre: "Papel lustre x10", precio: 55, categoria: "Arte", subCategoria: "Papeles Extendidos", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652205.png", vecesComprado: 22 },
                { id: 126, nombre: "Goma en spray", precio: 95, categoria: "Arte", subCategoria: "Pegamentos Especiales", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176182.png", vecesComprado: 12 },
                { id: 127, nombre: "Lápiz acuarela x12", precio: 150, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176166.png", vecesComprado: 15 },
                { id: 128, nombre: "Tabla cortar A3", precio: 85, categoria: "Arte", subCategoria: "Reglas", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652195.png", vecesComprado: 14 },
                { id: 129, nombre: "Plumón punta pincel", precio: 45, categoria: "Arte", subCategoria: "Marcadores para Colorear", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176286.png", vecesComprado: 19 },
                { id: 130, nombre: "Papel acuarela A3", precio: 85, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 13 },
                { id: 131, nombre: "Cinta doble cara", precio: 35, categoria: "Oficina", subCategoria: "Cintas Especiales", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176264.png", vecesComprado: 31 },
                { id: 132, nombre: "Portatarjetas", precio: 25, categoria: "Oficina", subCategoria: "Gafetes y Portagafetes", imagen: "https://cdn-icons-png.flaticon.com/512/2933/2933242.png", vecesComprado: 18 },
                { id: 133, nombre: "Lápiz tinta china", precio: 65, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176196.png", vecesComprado: 11 },
                { id: 134, nombre: "Grapadora pesada", precio: 150, categoria: "Oficina", subCategoria: "Engrapadoras y Desengrapadoras", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176185.png", vecesComprado: 9 },
                { id: 135, nombre: "Papel opalina x50", precio: 75, categoria: "Arte", subCategoria: "Papel Opalina", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652289.png", vecesComprado: 17 },
                { id: 136, nombre: "Pincel lengua de gato", precio: 55, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 12 },
                { id: 137, nombre: "Lápiz sepia", precio: 25, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176197.png", vecesComprado: 14 },
                { id: 138, nombre: "Perforadora 2 huecos", precio: 65, categoria: "Oficina", subCategoria: "Perforadoras", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176180.png", vecesComprado: 16 },
                { id: 139, nombre: "Cinta washi x5", precio: 75, categoria: "Arte", subCategoria: "Cintas Especiales", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176199.png", vecesComprado: 21 },
                { id: 140, nombre: "Papel canson A4", precio: 65, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 15 },
                { id: 141, nombre: "Marcador permanente", precio: 25, categoria: "Oficina", subCategoria: "Marcadores Permanentes", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176282.png", vecesComprado: 38 },
                { id: 142, nombre: "Goma laca", precio: 85, categoria: "Arte", subCategoria: "Aceites y Solventes", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176160.png", vecesComprado: 9 },
                { id: 143, nombre: "Lápiz conté negro", precio: 35, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176162.png", vecesComprado: 13 },
                { id: 144, nombre: "Papel vegetal A4", precio: 45, categoria: "Arte", subCategoria: "Papeles Especiales", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652288.png", vecesComprado: 16 },
                { id: 145, nombre: "Tinta acrílica", precio: 65, categoria: "Arte", subCategoria: "Pintura Acrílica", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176193.png", vecesComprado: 12 },
                { id: 146, nombre: "Pegamento barra x3", precio: 35, categoria: "Escolar", subCategoria: "Pegamentos", imagen: "https://cdn-icons-png.flaticon.com/512/891/891462.png", vecesComprado: 42 },
                { id: 147, nombre: "Cutter artesanal", precio: 45, categoria: "Arte", subCategoria: "Cutters", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176171.png", vecesComprado: 17 },
                { id: 148, nombre: "Papel iris x50", precio: 65, categoria: "Arte", subCategoria: "Papeles Extendidos", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652289.png", vecesComprado: 14 },
                { id: 149, nombre: "Lápiz carbón x6", precio: 55, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176162.png", vecesComprado: 11 },
                { id: 150, nombre: "Tinta dorada", precio: 95, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176193.png", vecesComprado: 13 },
                { id: 151, nombre: "Pincel abanico #4", precio: 65, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 10 },
                { id: 152, nombre: "Papel craft x10", precio: 45, categoria: "Arte", subCategoria: "Papeles Extendidos", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652201.png", vecesComprado: 18 },
                { id: 153, nombre: "Lápiz sanguina", precio: 30, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176275.png", vecesComprado: 14 },
                { id: 154, nombre: "Tinta plateada", precio: 95, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176193.png", vecesComprado: 12 },
                { id: 155, nombre: "Pincel lengua gato #10", precio: 85, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 11 },
                { id: 156, nombre: "Papel acuarela A1", precio: 120, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 8 },
                { id: 157, nombre: "Lápiz sepia x3", precio: 65, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176197.png", vecesComprado: 10 },
                { id: 158, nombre: "Tinta acuarela x6", precio: 110, categoria: "Arte", subCategoria: "Acuarelas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176193.png", vecesComprado: 9 },
                { id: 159, nombre: "Pincel redondo #12", precio: 95, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 10 },
                { id: 160, nombre: "Papel canson A3", precio: 85, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 12 },
                { id: 161, nombre: "Lápiz conté x6", precio: 120, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176162.png", vecesComprado: 9 },
                { id: 162, nombre: "Tinta negra 100ml", precio: 85, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176192.png", vecesComprado: 11 },
                { id: 163, nombre: "Pincel angular #12", precio: 110, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 8 },
                { id: 164, nombre: "Papel acuarela A0", precio: 150, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 7 },
                { id: 165, nombre: "Lápiz pastel x24", precio: 180, categoria: "Arte", subCategoria: "Lápices de Colores", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176191.png", vecesComprado: 10 },
                { id: 166, nombre: "Tinta blanca", precio: 65, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176193.png", vecesComprado: 12 },
                { id: 167, nombre: "Pincel mop #8", precio: 95, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 9 },
                { id: 168, nombre: "Papel acuarela A2", precio: 110, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 11 },
                { id: 169, nombre: "Lápiz acuarela x24", precio: 220, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176166.png", vecesComprado: 8 },
                { id: 170, nombre: "Tinta colores x12", precio: 150, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176193.png", vecesComprado: 9 },
                { id: 171, nombre: "Pincel detalle #000", precio: 65, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 13 },
                { id: 172, nombre: "Papel canson A2", precio: 95, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 10 },
                { id: 173, nombre: "Lápiz grafito x12", precio: 85, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176189.png", vecesComprado: 14 },
                { id: 174, nombre: "Tinta negra 250ml", precio: 120, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176192.png", vecesComprado: 7 },
                { id: 175, nombre: "Pincel lengua gato #14", precio: 110, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 8 },
                { id: 176, nombre: "Papel acuarela A1", precio: 130, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 9 },
                { id: 177, nombre: "Lápiz carbón x12", precio: 95, categoria: "Arte", subCategoria: "Lápices para Dibujo", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176162.png", vecesComprado: 10 },
                { id: 178, nombre: "Tinta sepia 100ml", precio: 95, categoria: "Arte", subCategoria: "Tintas Chinas", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176192.png", vecesComprado: 8 },
                { id: 179, nombre: "Pincel redondo #16", precio: 130, categoria: "Arte", subCategoria: "Brochas y Pinceles", imagen: "https://cdn-icons-png.flaticon.com/512/3176/3176158.png", vecesComprado: 7 },
                { id: 180, nombre: "Papel canson A1", precio: 110, categoria: "Arte", subCategoria: "Blocks", imagen: "https://cdn-icons-png.flaticon.com/512/3652/3652194.png", vecesComprado: 8 }
            ];
            await Product.insertMany(initialProducts);
            console.log('✅ Productos iniciales cargados exitosamente.');
        } else {
            console.log('ℹ️ La base de datos de productos ya contiene datos.');
        }
    } catch (error) {
        console.error('❌ Error al cargar productos iniciales:', error.message);
        console.error('Este error puede ocurrir si hay un problema con el esquema o los datos.');
    }
}

// --- Middlewares ---
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'https://papeleria-dany-online-1.onrender.com'], // Permite acceso desde tu local y tu frontend desplegado
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Para parsear JSON en las peticiones (req.body)

// --- Conexión a MongoDB ---
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('🎉 Conectado a MongoDB con éxito.');
        // ¡IMPORTANTE! Comenta la siguiente línea (cargarProductosIniciales();)
        // después de la primera ejecución exitosa para evitar duplicados en tu base de datos.
        cargarProductosIniciales(); // <-- ESTA LÍNEA DEBE ESTAR DESCOMENTADA AHORA para cargar productos
    })
    .catch(err => {
        console.error('❌ Error de conexión a MongoDB:', err.message);
        console.error('Por favor, verifica:');
        console.error('1. Que tu servidor MongoDB esté activo (ej. MongoDB Compass o `mongod` corriendo).');
        console.error('2. Que la `MONGO_URI` en tu archivo `.env` sea correcta (escribe `console.log(process.env.MONGO_URI)` temporalmente para verificarla).');
    });


// --- Rutas de la API (Endpoints) ---

// Ruta de prueba básica
app.get('/', (req, res) => {
    res.send('🎉 ¡Servidor Backend de Papelería Dany está funcionando!');
});

// GET /api/productos - Obtener todos los productos
app.get('/api/productos', async (req, res) => {
    try {
        const productos = await Product.find({}); // Encuentra todos los documentos en la colección 'products'
        res.json(productos); // Envía los productos como respuesta JSON
    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        res.status(500).json({ message: 'Error interno del servidor al obtener los productos', error: error.message });
    }
});

// GET /api/productos/:id - Obtener un producto por su ID numérico
app.get('/api/productos/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id }); // Busca por el campo 'id'
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error(`❌ Error al obtener el producto con ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al obtener el producto', error: error.message });
    }
});

// POST /api/productos - Crear un nuevo producto (solo para pruebas o administración, no para el usuario final)
app.post('/api/productos', async (req, res) => {
    try {
        // Asignar un nuevo ID. En un entorno real, MongoDB genera _id automáticamente.
        // Si quieres mantener tu campo 'id' numérico y secuencial, necesitarías una lógica más robusta.
        // Por simplicidad, aquí buscaremos el ID más alto y le sumaremos 1.
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        const newProduct = new Product({
            id: newId,
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria,
            subCategoria: req.body.subCategoria,
            imagen: req.body.imagen,
            etiqueta: req.body.etiqueta || null,
            vecesComprado: req.body.vecesComprado || 0
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); // 201 Created
    } catch (error) {
        console.error("❌ Error al crear producto:", error);
        res.status(400).json({ message: 'Error al crear producto. Datos inválidos.', error: error.message });
    }
});

// PUT /api/productos/:id - Actualizar un producto por ID
app.put('/api/productos/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(`❌ Error al actualizar el producto con ID ${req.params.id}:`, error);
        res.status(400).json({ message: 'Error al actualizar producto', error: error.message });
    }
});

// DELETE /api/productos/:id - Eliminar un producto por ID
app.delete('/api/productos/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(`❌ Error al eliminar el producto con ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
    }
});

// --- Ruta para manejar pedidos (ejemplo básico) ---
app.post('/api/pedidos', async (req, res) => {
    try {
        const { items, total } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'El pedido debe contener al menos un artículo.' });
        }

        console.log('--- 🛒 Pedido Recibido ---');
        console.log('Items del pedido:', items);
        console.log('Total del pedido:', total);

        // En un entorno de producción real, aquí harías:
        // 1. Guardar el pedido completo en una colección de "pedidos" en MongoDB.
        //    Necesitarías crear un nuevo esquema y modelo (OrderModel) para los pedidos.
        // 2. Descontar el stock de los productos vendidos (si tienes control de stock).
        // 3. Integración con pasarelas de pago, envío de emails de confirmación, etc.

        // Por ahora, como simulación y para actualizar 'vecesComprado':
        for (const item of items) {
            // Incrementa 'vecesComprado' para cada producto que se ha comprado
            await Product.updateOne(
                { id: item.id }, // Busca el producto por su ID
                { $inc: { vecesComprado: item.cantidad } }
            );
        }

        // Generar un ID de pedido simple para la respuesta (simulación)
        const orderId = `DANY-${Date.now()}`;

        console.log(`✅ Pedido ${orderId} procesado exitosamente.`);
        res.status(200).json({
            message: 'Pedido recibido y procesado con éxito',
            orderId: orderId,
            recibido: { items, total } // Opcional: devolver los datos recibidos
        });

    } catch (error) {
        console.error('❌ Error al procesar el pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor al procesar el pedido', error: error.message });
    }
});


// --- Iniciar el servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend de Papelería Dany corriendo en ${process.env.PUBLIC_BACKEND_URL || 'http://localhost:' + PORT}`);
    console.log(`🌐 Tu frontend debería acceder a esta API desde: ${process.env.PUBLIC_FRONTEND_URL || 'http://127.0.0.1:5500'}`);
    console.log('💡 ¡No olvides iniciar tu servidor MongoDB (ej. con MongoDB Compass o `mongod`) antes de correr este backend!');
});