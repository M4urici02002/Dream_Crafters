const db = require("../util/database");
const Compra = require('../models/compras.model');
const Pregunta = require('../models/pregunta.model');
const fs = require('fs');
const ejs = require('ejs');
const mg = require('mailgun-js');
const dotenv = require('dotenv');

dotenv.config();

const mailgun = () => mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

exports.get_catalogoCompras = async (request, response, next) => {
   try {
    const ucompras = await Compra.fetchAll();

    response.render("compras", {
        compras: ucompras,
        permisos: request.session.permisos || [],
        csrfToken: request.csrfToken(),
    });

   } catch (error) {
     console.log(error);
     response.status(500).send("Error al obtener catálogo de compras");
   }
};


exports.post_emailForm = async (req, res, next) => {
  try {
      // Obtener los ID de Encuesta del cuerpo de la solicitud POST
      const idEncuestas = req.body.idEncuestas;
      const nombresClientes = req.body.nombresClientes;
      const nombresProductos = req.body.nombresProductos;

      // Obtener el primer ID de Encuesta del arreglo (si existe)
      const primerIdEncuesta = 137;
      const primerNombre = "Pepe";
      const primerProducto = "Colchon";

      // Console.log para verificar si los ID de Encuesta se reciben correctamente
      console.log('ID de Encuestas recibidos en el controlador:', idEncuestas);
      console.log('Nombres de los clientes recibidos en el controlador:', nombresClientes);
      console.log('Nombres productos recibidos en el controlador:', nombresProductos);
      console.log('Primer ID de Encuesta:', primerIdEncuesta);
      console.log('Nombre:', primerNombre);
      console.log('Producto:', primerProducto);

      // Obtener preguntas por ID de Encuesta
      const preguntas = await Pregunta.fetchAllByEncuesta(primerIdEncuesta);
      // Log de las preguntas
      console.log('Preguntas obtenidas:', preguntas);

      const emailInfo = {
          from: `"DreamCrafters" <dreamcrafters.code@gmail.com>`,
          to: 'pm.garridoo@gmail.com', // Cambiar a la dirección de correo electrónico a la que quieres enviar el formulario
          subject: 'Reseña Zebrands'
      };

      // Lee el contenido del archivo emailForm.ejs
      fs.readFile('./views/emailContent.ejs', 'utf8', (err, data) => {
          if (err) {
              console.error(err);
              res.status(500).send('Error al cargar el formulario.');
          } else {
              // Renderiza el contenido del archivo EJS, pasando primerIdEncuesta y preguntas como variables
              const htmlContent = ejs.render(data, { primerIdEncuesta: primerIdEncuesta, primerNombre: primerNombre, primerProducto: primerProducto, preguntas: preguntas});
              // Agrega el contenido renderizado al cuerpo del correo electrónico
              emailInfo.html = htmlContent;

              // Log the HTML content to the console
              console.log('HTML content:', htmlContent);

              // Envía el correo electrónico
              mailgun().messages().send(emailInfo, (error, body) => {
                  if (error) {
                      console.log(error);
                      res.status(500).send({
                          message: '¡Algo salió mal al enviar el correo electrónico!'
                      });
                  } else {
                      res.send({ message: '¡Correo electrónico enviado exitosamente!' });
                  }
              });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: '¡Algo salió mal al enviar el correo electrónico!' });
  }
};




/*
exports.post_emailForm = (req, res, next) => {
  try {
    // Obtener los ID de Encuesta del cuerpo de la solicitud POST
    const idEncuestas = req.body.idEncuestas;

    // Obtener el primer ID de Encuesta del arreglo (si existe)
    const primerIdEncuesta = idEncuestas && idEncuestas.length > 0 ? idEncuestas[0] : null;

    // Console.log para verificar si los ID de Encuesta se reciben correctamente
    console.log('ID de Encuestas recibidos en el controlador:', idEncuestas);
    console.log('Primer ID de Encuesta:', primerIdEncuesta);

    const emailInfo = {
        from: `"DreamCrafters" <dreamcrafters.code@gmail.com>`,
        to: 'pm.garridoo@gmail.com', // Cambiar a la dirección de correo electrónico a la que quieres enviar el formulario
        subject: 'Reseña Zebrands'
    };

    // Lee el contenido del archivo emailForm.ejs
    fs.readFile('emailContent.ejs', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al cargar el formulario.');
        } else {
            // Renderiza el contenido del archivo EJS
            const htmlContent = ejs.render(data);
            // Agrega el contenido renderizado al cuerpo del correo electrónico
            emailInfo.html = htmlContent;

            // Envía el correo electrónico
            mailgun().messages().send(emailInfo, (error, body) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({
                        message: '¡Algo salió mal al enviar el correo electrónico!'
                    });
                } else {
                    res.send({ message: '¡Correo electrónico enviado exitosamente!' });
                }
            });
        }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '¡Algo salió mal al enviar el correo electrónico!' });
  }
};

*/