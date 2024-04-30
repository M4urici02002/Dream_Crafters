const db = require('../util/database');
const Encuesta = require('../models/encuesta.model');
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

exports.get_categoriasMarca = async (request, response, next) => {
    try {
        const [categoria] = await db.query(`
            SELECT DISTINCT Categoria, M.nombre AS nombre_marca
            FROM producto P, marca M
            WHERE P.IDMarca=M.IDMarca
            AND M.nombre='LUUNA';
        `);

        response.render('encuestaForm', {
            categoriasMarca: categoria,
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
        });
    } catch (error) {
        console.log(error);
        response.status(500).send("Error al obtener categorias");
    }
};

exports.post_categoriasMarca = async (request, response, next) => {
    console.log(request.body);

    try {
        // Guarda la encuesta en la base de datos
        const result = await Encuesta.save(
            request.body.IDMarca,
            request.body.titulo,
            request.body.diasParaEnvio,
            request.body.categoria,
        );
        if (!request.body.IDMarca || !request.body.titulo || !request.body.diasParaEnvio || !request.body.categoria) {
            throw new Error("Error: Faltan parámetros en la solicitud.");
        }

        // Extrae el ID de la encuesta insertada del resultado
        const IDEncuesta = result[0].insertId;

        // Almacena IDEncuesta en la sesión
        request.session.IDEncuesta = IDEncuesta;

        // Redirige a la página de edición
        response.redirect('/template/editarEncuesta');
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }
};

exports.get_EditarEncuesta = (request, response, next) => {
    const IDEncuesta = request.session.IDEncuesta;
    let idPreguntasAgregadas = [];

    Pregunta.fetchAllByCategoria(IDEncuesta).then(([preguntas]) => {
        response.render('template', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
            IDEncuesta: IDEncuesta,
            preguntas: preguntas,
            idPreguntasAgregadas: idPreguntasAgregadas,
        });
    }).catch(err => {
        console.error('Error fetching preguntas:', err);
        response.status(500).send('Error cargando la página');
    });
};    

exports.post_editarEncuesta = async (request, response, next) => {
    try {
        const IDEncuesta = request.body.IDEncuesta;
        
        // Si hay nuevas preguntas agregadas guarda el ID de la pregunta en la tabla preguntaencuesta
        if (request.body.idPreguntasAgregadas) {
            const idPreguntasAgregadas = JSON.parse(request.body.idPreguntasAgregadas);

            // Iterar sobre el arreglo de idPreguntasAgregadas y guarda cada ID en la tabla preguntaencuesta
            for (const idPregunta of idPreguntasAgregadas) {
                await Pregunta.guardarPreguntaEnEncuesta(IDEncuesta, idPregunta);
            }
        }
        // AQUI
        response.redirect('/graficas');
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
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

