const ZecoreVentas = require("../models/zecoreVentas.model");
const ZecoreProduct = require("../models/zecoreProduct.model");

exports.validateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token || token !== process.env.API_KEY) {
    return res.status(403).json({ message: "No tienes acceso." });
  }
  next();
};

exports.postModificarProducto = (request, response, next) => {
  const MP = request.body;
  const ModificarProducto = new ZecoreProduct();
  ModificarProducto.ModificarProducto(MP.idProducto, MP.Columna, MP.NuevoValor)
    .then(() => {
      return response
        .status(200)
        .json({ message: "Aceptada" });
    })
    .catch((error) => {
      console.log("Error: " + error);
      return response
        .status(500)
        .json({ message: "Error: " + error });
    });
};

exports.postNuevoProducto = (request, response, next) => {
  const data = request.body;
  const { IDProducto, IDMarca, Nombre, Image, Descripcion, Categoria, Titulo } =
    data;
  const nuevoProducto = new ZecoreProduct(IDProducto, IDMarca, Nombre, Image, Descripcion, Categoria, Titulo);
  nuevoProducto.nuevoProducto()
    .then(() => {
      return response
        .status(200).json({ message: "registro de producto exitoso" });
    })
    .catch((error) => {
      console.log("Error: " + error);
      return response
        .status(500).json({ message: "Error: " + error });
    });
};

exports.postVenta = async (request, response, next) => {
  const data = request.body;
  const { IDCompra, IDProducto, IDCliente, Fecha} = data;
  const venta = new ZecoreVentas(IDCompra, IDProducto, IDCliente, Fecha);
  let x= await venta.BuscarCliente()
  console.log(x)
  if(x === false){
    await venta.registrarCliente();
  }
  await venta.RegistrarCompra()
    .then(() => {
      return response.status(200).json({message: "Informacion recibida"});
    })
    .catch((error) => {
      console.log("Error: " + error);
      return response
        .status(500).json({ message: "Error al recibir la información" });
    });
};