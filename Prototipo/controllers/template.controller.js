const db = require('../util/database');
const Encuesta = require('../models/encuesta.model');
const Pregunta = require('../models/pregunta.model');

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

// In your post_categoriasMarca controller
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

    response.render('template', {
        username: request.session.username || '',
        permisos: request.session.permisos || [],
        csrfToken: request.csrfToken(),
        IDEncuesta: IDEncuesta 
    });
};

exports.get_agregarPregunta = (request, response, next) => {
    const IDEncuesta = request.session.IDEncuesta; 
    Pregunta.fetchAllByIDEncuesta(IDEncuesta).then(([preguntas]) => {
        response.render('agregarPregunta', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
            IDEncuesta: IDEncuesta,
            preguntas: preguntas,
        });
    }).catch(err => {
        console.error('Error fetching preguntas:', err);
        response.status(500).send('Error cargando la página');
    });
};    


exports.get_diasParaEnvio = (request, response, next) => {
    const IDEncuesta = request.session.IDEncuesta; 
    
    response.render('diasParaEnvio', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
            IDEncuesta: IDEncuesta,
        });
};

exports.post_diasParaEnvio = async (request, response, next) => {
    const IDEncuesta = request.session.IDEncuesta;
    const nuevosDiasParaEnvio = request.body.diasParaEnvio;

    // ESTO FALTA COMO OBTENER DE LA BD !!!!!!!!!!!!
    const IDMarca = request.session.IDMarca;
    const titulo = request.session.titulo;
    const categoria = request.session.categoria;

    try {
        // Actualizar los días para envío en la base de datos
        await Encuesta.updateDiasParaEnvio(IDEncuesta, nuevosDiasParaEnvio, IDMarca, titulo, categoria);
        
        // Redireccionar a la página principal
        response.redirect("/template");
    } catch (error) {
        console.log(error);
        response.status(500).send("Error al actualizar los días para envío en la base de datos");
    }
};
