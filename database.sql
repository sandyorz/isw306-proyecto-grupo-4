-- --- Participación de Albert Peña (100037998) ---
-- Resumen: Creación del script SQL para estructurar la tabla de incidencias 
-- que usará SQLite como persistencia de datos.

CREATE TABLE IF NOT EXISTS bugs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    severity TEXT NOT NULL,
    module TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de prueba
INSERT INTO bugs (email, severity, module, description) 
VALUES ('admin@grupo4.com', 'high', 'Autenticación', 'Error de conexión inicial al levantar el servidor');