function mostrarMensaje(mensaje) {
    const mensajeDescarga = document.getElementById('mensajeDescarga');
    const contenidoMensaje = document.getElementById('contenidoMensaje');
    contenidoMensaje.innerText = mensaje;
    mensajeDescarga.classList.remove('hidden');
}

function cerrarMensaje() {
    const mensajeDescarga = document.getElementById('mensajeDescarga');
    mensajeDescarga.classList.add('hidden');
}

document.querySelector('.download').addEventListener('click', function() {
    fetch('/reporte')
        .then(response => {
            if (response.ok) {
                mostrarMensaje('Descarga exitosa');
            } else {
                mostrarMensaje('Error al descargar el archivo');
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            mostrarMensaje('Error al descargar el archivo');
        });
});