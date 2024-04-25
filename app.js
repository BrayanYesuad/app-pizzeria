const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a la base de datos
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE usuarios (id INTEGER PRIMARY KEY, nombre TEXT, email TEXT, password TEXT)");
    db.run("CREATE TABLE pizzas (id INTEGER PRIMARY KEY, nombre TEXT, descripcion TEXT, precio REAL)");
    db.run("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, usuario_id INTEGER, pizza_id INTEGER, cantidad INTEGER, total REAL, FOREIGN KEY(usuario_id) REFERENCES usuarios(id), FOREIGN KEY(pizza_id) REFERENCES pizzas(id))");
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    db.all("SELECT * FROM usuarios", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error en el servidor");
        } else {
            res.json(rows);
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
