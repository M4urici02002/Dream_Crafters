const Resena = require('../models/resena.model');

exports.get_resena = (request, response, next) => {
    response.render('resena');
};