const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Opcionalmente, puedes especificar un archivo en lugar de ':memory:' para almacenar la base de datos en disco.

// Crear tablas
db.serialize(() => {
    db.run("CREATE TABLE usuarios (id INTEGER PRIMARY KEY, nombre TEXT, email TEXT, password TEXT)");
    db.run("CREATE TABLE pizzas (id INTEGER PRIMARY KEY, nombre TEXT, descripcion TEXT, precio REAL)");
    db.run("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, usuario_id INTEGER, pizza_id INTEGER, cantidad INTEGER, total REAL, FOREIGN KEY(usuario_id) REFERENCES usuarios(id), FOREIGN KEY(pizza_id) REFERENCES pizzas(id))");
});

module.exports = db;
