// Ejemplo de manejo de eventos de clic
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('botonEnviar').addEventListener('click', function(event) {
        // Código para enviar formulario o realizar acción
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    });
});

