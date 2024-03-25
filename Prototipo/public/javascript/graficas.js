document.getElementById("selectMenu").addEventListener("change", function() {
    var categoriaDropdown = document.getElementById("categoriaDropdown");
    var productoDropdown = document.getElementById("productoDropdown");
    
    if (this.value === "categoria") {
        categoriaDropdown.style.display = "block";
        productoDropdown.style.display = "none";

    } else if (this.value === "producto") {
        categoriaDropdown.style.display = "none";
        productoDropdown.style.display = "block";

    } else {
        categoriaDropdown.style.display = "none";
        productoDropdown.style.display = "none";
    }
});