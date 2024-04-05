const db = require('../util/database');
const Encuesta = require('../models/encuesta.model');

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
        });
    } catch (error) {
        console.log(error);
        response.status(500).send("Error al obtener categorias");
    }
};

exports.post_categoriasMarca = (request, response, next) => {
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
};

exports.get_EditarEncuesta = (request, response, next) => {
    response.render('template', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
        });
};

exports.get_agregarPregunta = (request, response, next) => {
    response.render('agregarPregunta', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
        });
};

exports.get_diasParaEnvio = (request, response, next) => {
    response.render('diasParaEnvio', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
        });
};