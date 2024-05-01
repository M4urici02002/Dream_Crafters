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
        // Obtener los ID de Encuesta, nombres de clientes y nombres de productos del cuerpo de la solicitud POST
        const idEncuestas = req.body.idEncuestas;
        const nombresClientes = req.body.nombresClientes;
        const nombresProductos = req.body.nombresProductos;
        const correosClientes = req.body.correosClientes;
  
        // Console.log para verificar si los ID de Encuesta, nombres de clientes y nombres de productos se reciben correctamente
        console.log('ID de Encuestas recibidos en el controlador:', idEncuestas);
        console.log('Nombres de los clientes recibidos en el controlador:', nombresClientes);
        console.log('Nombres de productos recibidos en el controlador:', nombresProductos);
        console.log('Correos de clientes recibidos en el controlador:', correosClientes);

        const idEncuestas2 = [1, 3]; // Arreglo de IDs de Encuesta
        const nombresClientes2 = ["Paola", "Valeria"]; // Arreglo de nombres de clientes
        const nombresProductos2 = ["Colchón", "Almohada"]; // Arreglo de nombres de productos
        const correosClientes2 = ["pm.garridoo@gmail.com", "valeria.zuniga.men@gmail.com"]; // Arreglo de correos electrónicos

  
        // Obtener preguntas por cada ID de Encuesta y enviar correo electrónico para cada conjunto de datos
        for (let i = 0; i < idEncuestas2.length; i++) {
            const preguntas = await Pregunta.fetchAllByEncuesta(idEncuestas2[i]);
            console.log(`Preguntas obtenidas para la encuesta ${idEncuestas2[i]}:`, preguntas);
        
            const totalPreguntas = preguntas.reduce((total, subarreglo) => total + subarreglo.length, 0);
            console.log(`Número de preguntas obtenidas para la encuesta ${idEncuestas2[i]}: ${totalPreguntas}`);
            
            const length = totalPreguntas - 1;
  
            (async () => {
                const emailInfo = {
                    from: `"DreamCrafters" <dreamcrafters.code@gmail.com>`,
                    to: correosClientes2[i], // Correo electrónico correspondiente al índice i
                    subject: 'Reseña Zebrands'
                };

                // Lee el contenido del archivo emailForm.ejs
                fs.readFile('./views/emailContent.ejs', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error al cargar el formulario.');
                    } else {
                        // Renderiza el contenido del archivo EJS, pasando los valores correspondientes
                        const htmlContent = ejs.render(data, { idEncuestas2: idEncuestas2[i], nombresClientes2: nombresClientes2[i], nombresProductos2: nombresProductos2[i], preguntas: preguntas, length : length });
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
                                console.log(`Correo electrónico enviado exitosamente para la encuesta ${idEncuestas2[i]}`);
                            }
                        });
                    }
                });
            })();
        }
  
        res.send({ message: '¡Correos electrónicos enviados exitosamente!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: '¡Algo salió mal al enviar los correos electrónicos!' });
    }
};

  

