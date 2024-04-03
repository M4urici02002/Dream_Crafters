exports.get_template= (request, response, next) => {
    response.render('template', {
        permisos: request.session.permisos || [],

    });
};
