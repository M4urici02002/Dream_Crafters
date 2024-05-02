module.exports = (request, response, next) => {
    let canAdmin =  false;
    for (let permiso of request.session.permisos) {
        if (permiso.permiso == 'adminUsuarios') {
            canAdmin = true;
        }
    }
    if(canAdmin) {
        next();
    } else {
        return response.redirect('/users/logout');    
    }
}