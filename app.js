const db = require('./database.js');

// Iniciar la transacción
db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    // Insertar nuevo usuario
    db.run("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", ["Juan", "juan@example.com", "contraseña"], function(err) {
        if (err) {
            console.error(err.message);
            db.run("ROLLBACK"); // Deshacer la transacción si hay un error
        } else {
            const usuarioId = this.lastID;

            // Insertar pedido correspondiente
            db.run("INSERT INTO pedidos (usuario_id, pizza_id, cantidad, total) VALUES (?, ?, ?, ?)", [usuarioId, 1, 2, 20.50], function(err) {
                if (err) {
                    console.error(err.message);
                    db.run("ROLLBACK"); // Deshacer la transacción si hay un error
                } else {
                    db.run("COMMIT"); // Confirmar la transacción si todo está bien
                    console.log("Transacción completada correctamente.");
                }
            });
        }
    });
});
