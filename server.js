// --- Participación de Sandy Ortíz (100049907) ---
// Resumen: Configuración inicial del servidor Node.js con Express, habilitación de CORS 
// y conexión a la base de datos local SQLite para automatizar la creación del archivo .db.

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json()); 

const db = new sqlite3.Database('./devops_dashboard.db', (err) => {
    if (err) {
        console.error('Error conectando a la BD:', err.message);
    } else {
        console.log('✅ Conectado a la base de datos SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS bugs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            severity TEXT NOT NULL,
            module TEXT NOT NULL,
            description TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});