// ==========================================================================
// PARTICIPACIÓN ETAPA 3
// Sandy Ortíz (100049907) - Configuración inicial del servidor Express,
//   CORS y conexión a SQLite con creación automática de la tabla bugs.
// Alexander Tejeda (100074246) - Endpoints GET (listar) y POST (crear).
// ==========================================================================
// PARTICIPACIÓN ETAPA 4
// Albert Peña (100037998) - Autenticación por sesiones: login, logout,
//   verificación de sesión y middleware de protección.
// Sandy Ortíz (100049907) - Mejora de GET con filtros por severidad y
//   módulo, endpoints PUT y DELETE para CRUD completo.
// Alexander Tejeda (100074246) - Endpoint de KPIs dinámicos.
// ==========================================================================
// ===== ETAPA 4 | Sandy Ortiz | Infraestructura =====
// Migración Live Server → Express: servir frontend como estáticos.
// ===== FIN ETAPA 4 | Sandy Ortiz =====

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ===== ETAPA 4 | Sandy Ortiz | Infraestructura =====
// Bloquear acceso a archivos sensibles (BD, SQL, docs internas, config)
app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    const blockedExtensions = ['.db', '.sql', '.txt', '.md', '.json', '.lock'];
    const ext = path.extname(req.path).toLowerCase();
    if (blockedExtensions.includes(ext)) {
        return res.status(404).type('text').send('Not found');
    }
    next();
});
// Servir solo archivos web estáticos (index.html, style.css, app.js)
app.use(express.static(__dirname));
// ===== FIN ETAPA 4 | Sandy Ortiz =====

// ===== ETAPA 4 | Albert Pena | Sesiones =====
app.use(session({
    secret: 'grupo4_sw_2026',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));
// ===== FIN ETAPA 4 | Albert Pena =====

const db = new sqlite3.Database('./devops_dashboard.db', (err) => {
    if (err) {
        console.error('Error conectando a la BD:', err.message);
    } else {
        console.log('Conectado a SQLite.');
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

// ===== ETAPA 4 | Albert Pena | requireAuth =====
function requireAuth(req, res, next) {
    if (req.session && req.session.user) return next();
    res.status(401).json({ error: 'No autorizado' });
}
// ===== FIN ETAPA 4 | Albert Pena =====

// ===== ETAPA 4 | Albert Pena | Login =====
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'grupo4') {
        req.session.user = { username, role: 'admin' };
        return res.json({ message: 'Login exitoso', user: req.session.user });
    }
    res.status(401).json({ error: 'Credenciales invalidas' });
});
// ===== FIN ETAPA 4 | Albert Pena =====

// ===== ETAPA 4 | Albert Pena | Logout =====
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => res.json({ message: 'Sesion cerrada' }));
});
// ===== FIN ETAPA 4 | Albert Pena =====

// ===== ETAPA 4 | Albert Pena | Session Check =====
app.get('/api/session', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});
// ===== FIN ETAPA 4 | Albert Pena =====


// ===== ETAPA 4 | Sandy Ortiz | GET con filtros =====
app.get('/api/bugs', (req, res) => {
    let sql = 'SELECT * FROM bugs WHERE 1=1';
    const params = [];
    if (req.query.severity) {
        sql += ' AND severity = ?';
        params.push(req.query.severity);
    }
    if (req.query.module) {
        sql += ' AND module LIKE ?';
        params.push('%' + req.query.module + '%');
    }
    sql += ' ORDER BY id DESC';
    if (req.query.limit) {
        sql += ' LIMIT ?';
        params.push(parseInt(req.query.limit));
    }
    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// ===== FIN ETAPA 4 | Sandy Ortiz =====

app.post('/api/bugs', (req, res) => {
    const { email, severity, module, description } = req.body;
    const sql = 'INSERT INTO bugs (email, severity, module, description) VALUES (?, ?, ?, ?)';
    db.run(sql, [email, severity, module, description], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Bug registrado', bugId: this.lastID });
    });
});

// ===== ETAPA 4 | Sandy Ortiz | PUT =====
app.put('/api/bugs/:id', requireAuth, (req, res) => {
    const { email, severity, module, description } = req.body;
    const sql = 'UPDATE bugs SET email = ?, severity = ?, module = ?, description = ? WHERE id = ?';
    db.run(sql, [email, severity, module, description, req.params.id], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'No encontrado' });
        res.json({ message: 'Bug actualizado' });
    });
});
// ===== FIN ETAPA 4 | Sandy Ortiz =====

// ===== ETAPA 4 | Sandy Ortiz | DELETE =====
app.delete('/api/bugs/:id', requireAuth, (req, res) => {
    const sql = 'DELETE FROM bugs WHERE id = ?';
    db.run(sql, [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'No encontrado' });
        res.json({ message: 'Bug eliminado' });
    });
});
// ===== FIN ETAPA 4 | Sandy Ortiz =====

// ===== ETAPA 4 | Alexander Tejeda | KPIs =====

// ===== FIN ETAPA 4 | Alexander Tejeda =====

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});