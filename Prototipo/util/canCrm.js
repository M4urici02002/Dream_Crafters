module.exports = (request, response, next) => {
    let canCrm =  false;
    for (let permiso of request.session.permisos) {
        if (permiso.permiso == 'crm') {
            canCrm = true;
        }
    }
    if(canCrm) {
        next();
    } else {
        return response.redirect('/users/logout');    
    }
}