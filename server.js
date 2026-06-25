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

// --- Participación de Alexander Tejeda (100074246) ---
// Resumen: Implementación de los endpoints de la API. GET para listar incidencias 
// y POST para registrar nuevas desde el formulario del frontend.

app.get('/api/bugs', (req, res) => {
    const sql = `SELECT * FROM bugs ORDER BY id DESC LIMIT 5`; 
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/bugs', (req, res) => {
    const { email, severity, module, description } = req.body;
    const sql = `INSERT INTO bugs (email, severity, module, description) VALUES (?, ?, ?, ?)`;
    db.run(sql, [email, severity, module, description], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Guardado exitoso", bugId: this.lastID });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});