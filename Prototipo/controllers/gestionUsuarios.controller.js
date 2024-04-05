const Usuario = require('../models/usuario.model');

const db=require('../util/database');

exports.get_usuarioRegistrado = async (request, response, next) => {
    try {
        const [users] = await db.query(`
            SELECT U.username, U.nombre, rol.nombre AS rol_nombre
            FROM usuario U
            JOIN asigna A ON U.username = A.username
            JOIN rol ON A.idrol = rol.idrol;
        `);
        Usuario.fetchAll()
        response.render('gestionUsuarios', {
            usuarioRegistrado: users,
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
        });
    } catch (error) {
        console.log(error);
        response.status(500).send("Error al obtener usuarios registrados");
    }
};


// Crear usuario
exports.get_crearUsuario = (request, response, next) => {
    response.render('crearUsuario',{
        permisos: request.session.permisos || [],
        csrfToken: request.csrfToken(),
    });
};

// Modificar usuario
exports.get_modificarUsuario = async (request, response, next) => {
    try {
        // Buscar el usuario correspondiente en la base de datos utilizando su username
        const [usuarios, fieldData] = await Usuario.fetchOne(request.params.username);
        
        // Llama a la función consultaRol con el nombre de usuario actual
        const [nombreRol] = await db.query(`
            SELECT consultaRol('${request.params.username}');
        `);

        response.render('modificarUsuarios', {
            nombre_rol: nombreRol,
            // Pasar los datos de usuario y genera un token CSRF para protección contra CSRF
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
            // Pasar la información del producto que se va a editar
            usuario: usuarios[0], // Tomar el primer elemento del arreglo de usuarios (asumiendo que fetchOne devuelve solo uno)
        });
    } catch (error) {
        console.log(error);
    }
};



// Función para guardar los cambios realizados en la modificación del usuario
exports.post_modificarUsuario = (request, response, next) => {
    Usuario.update(request.body.username,         
                    request.body.nombre, 
                    request.body.password)
        .then(([rows, fieldData]) => {
            // Redirigir al usuario de vuelta a la gestión de Usuarios una vez que la actualización se complete con éxito
            response.redirect('/gestionUsuarios');
        })
        .catch((error) => {
            console.log(error)
        });
};


exports.post_crearUsuario = (request, response, next) => { //no
    console.log(request.body);
    const usuario = new UsuarioRegistrado(
        request.body.username, 
        request.body.nombre,
        request.body.rol,
    );

    usuario.save()
        .then(([rows, fieldData]) => {
            response.redirect('/gestionUsuarios');
        }).catch((error) => {
            console.log(error);
        });
};

exports.post_eliminar = (request, response, next) => {
    console.log("Username a eliminar:", request.body.username); // Añade esto para depuración
    Usuario.eliminar(request.body.username)
        .then(() => {
            return Usuario.fetchAll();
        }).then(([usuarios, fieldData]) => {
            return response.status(200).json({usuarios: usuarios});
        }).catch((error) => {console.log(error)})
};