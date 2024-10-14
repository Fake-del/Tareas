const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// Middleware
app.use(bodyParser.json());
app.use(cors());
// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./tareas.db', (err) => {
if (err) {
console.error('Error al abrir la base de datos:', err.message);
} else {
console.log('Conexión exitosa a la base de datos SQLite.');
}
});
// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS tareas (
id INTEGER PRIMARY KEY AUTOINCREMENT,
descripcion TEXT NOT NULL,

completada INTEGER DEFAULT 0
)`);
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor corriendo en el puerto ${PORT}`);
});