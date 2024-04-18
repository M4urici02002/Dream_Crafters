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

/*exports.post_categoriasMarca = (request, response, next) => {
    console.log(request.body);
    const mi_encuesta = new Encuesta(
        request.body.titulo, 
        request.body.categoria,
        request.body.IDMarca // Pass IDMarca from the form
    );

    mi_encuesta.save()
        .then(([rows, fieldData]) => {
            response.redirect('/template/editarEncuesta');
        }).catch((error) => {
            console.log(error);
        });
};*/

// In your post_categoriasMarca controller
exports.post_categoriasMarca = async (request, response, next) => {
    console.log(request.body);
    const mi_encuesta = new Encuesta(
        null,
        request.body.IDMarca,
        request.body.titulo,
        null,
        request.body.categoria
    );

    try {
        // Save the encuesta to the database and retrieve the generated IDEncuesta
        const [result] = await mi_encuesta.save();
        const IDEncuesta = result.insertId; // Retrieve the auto-generated ID

        // Store IDEncuesta in session
        request.session.IDEncuesta = IDEncuesta;

        // Redirect to the edit page
        response.redirect('/template/editarEncuesta');
    } catch (error) {
        console.log(error);
        // Handle error
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
    
    response.render('diasParaEnvio', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
        });
};