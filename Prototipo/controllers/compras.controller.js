const db = require("../util/database");
const Compra = require('../models/compras.model');
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

exports.post_emailForm = (req, res, next) => {
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
};

