const UsuarioRegistrado = require('../models/gestionUsuarios.model');

exports.get_usuarioRegistrado = (request, response, next) => {
    response.render('gestionUsuarios',{
        usuarioRegistrado: UsuarioRegistrado.fetchAll(),
    });
};