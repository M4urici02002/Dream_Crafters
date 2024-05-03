const db = require("../util/database");

module.exports = class ZecoreProduct {
  constructor(IDProducto, IDMarca, Nombre, Imagen, Descripcion, Categoria, Titulo) {
    this.IDProducto = IDProducto;
    this.IDMarca = IDMarca;
    this.Nombre = Nombre;
    this.Imagen = Imagen;
    this.Descripcion = Descripcion;
    this.Categoria = Categoria;
    this.Titulo = Titulo;
  }

  async nuevoProducto() {
    try {
      const producto = await db.execute(
        "insert into producto(IDProducto, IDMarca, Nombre, Imagen, Descripcion, Categoria, Titulo ) values(?,?,?,?,?,?,?)",
        [
          this.IDProducto, this.IDMarca, this.Nombre, this.Imagen, this.Descripcion, this.Categoria,this.Titulo
        ]
      );
      console.log("Registro Exitoso");
      return producto;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async ModificarProducto(id, columna, nuevoValor) {
    try {
      const result = await db.execute(
        `UPDATE producto SET ${columna} = ? WHERE IDProducto = ?`,
        [nuevoValor, id]
      );
      console.log("Modificacion exitosa");
      return result;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
};