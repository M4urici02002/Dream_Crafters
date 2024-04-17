document.addEventListener("DOMContentLoaded", function() {
    // Obtener el valor seleccionado actualmente del menú desplegable
    var categoriaSeleccionada = sessionStorage.getItem('categoriaSeleccionada');
  
    // Si hay una categoría seleccionada, establecerla como seleccionada en el menú desplegable
    if (categoriaSeleccionada) {
      document.querySelector('.categorias').value = categoriaSeleccionada;
    }
  
    // Agregar un evento para guardar la selección cuando cambie el menú desplegable
    document.querySelector('.categorias').addEventListener('change', function() {
      sessionStorage.setItem('categoriaSeleccionada', this.value);
    });
});

