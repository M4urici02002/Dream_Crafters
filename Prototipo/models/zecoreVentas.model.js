const db = require("../util/database");

module.exports = class ZecoreVentas {
  constructor(IDCompra, IDProducto, IDCliente, Fecha) {
    this.IDCompra = IDCompra;
    this.IDProducto = IDProducto;
    this.IDCliente = IDCliente;
    this.Fecha = Fecha;

  }
  
  async registrarCliente(){
    try{
      const cliente = await db.execute('insert into cliente (IDCliente, Nombre, Correo) values (?,?,?)',
      [this.IDCliente, this.Nombre, this.Correo]);
      console.log("Cliente registrado");
      return cliente;
    } 
    catch (error){
      console.error('Error al obtener los datos: '+ error);
    }
  }


  async BuscarCliente(){
    try{
      const cliente = await db.execute('select IDCliente from cliente where IDCliente = ?',[this.IDCliente]);
      console.log(cliente)
      if(result[0].length > 0){
        return true;
      }else{
        return false;
      }
    } catch (error){
      console.error('Error al obtener los datos: '+ error);
    }
  }

  async RegistrarCompra() {
    try {
      const compra = await db.execute(
        "insert into venta (IDCompra, IDProducto, IDCliente , Fecha) values (default, ?, ?, ?)",
        [this.IDCompra, this.IDProducto, this.IDCliente, this.Fecha,]
      );
      console.log("Compra Registrada");
      return compra;
    } 
    catch (error) {
      console.error("Error al obtener los datos: ", error);
    }
  }
};