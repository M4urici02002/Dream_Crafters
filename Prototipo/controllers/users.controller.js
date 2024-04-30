const Usuario = require('../models/usuario.model');
const Rol = require('../models/rol.model');

const bcrypt = require('bcryptjs');

exports.getLogin = (request, response, next) => {
  const error = request.session.error || "";
  request.session.error = "";
  response.render("login", {
    username: request.session.username || "",
    registro: false,
    csrfToken: request.csrfToken(),
    error: error,
    permisos: request.session.permisos || [],
  });
};

exports.postLogin = (request, response, next) => {
  Usuario.fetchOneWithRole(request.body.username)
    .then(([usuarios, fieldData]) => {
      if (usuarios.length == 1) {
        const usuario = usuarios[0];
        if (request.body.username === usuario.username) {
          // Continuar con la verificación de la contraseña
          bcrypt
            .compare(request.body.password, usuario.password)
            .then((doMatch) => {
              if (doMatch) {
                // Continuar si la contraseña es correcta
                Usuario.getPermisos(usuario.username)
                  .then(([permisos, fieldData]) => {
                    console.log(permisos);
                    console.log(usuario);
                    request.session.permisos = permisos;
                    request.session.username = usuario.username;
                    request.session.nombre = usuario.nombre;
                    request.session.rol = usuario.nombre_rol; // Guardar el rol en la sesión
                    request.session.isLoggedIn = true;
                    response.redirect("/graficas");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                // La contraseña no coincide
                request.session.error = "Usuario y/o contraseña incorrectos";
                response.redirect("/login");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // El nombre de usuario no coincide exactamente
          request.session.error = "Usuario y/o contraseña incorrectos";
          response.redirect("/login");
        }
      } else {
        // No se encontró el usuario
        request.session.error = "Usuario y/o contraseña incorrectos";
        response.redirect("/login");
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send('Error al intentar iniciar sesión');
    });
};


exports.getLogout = (request, response, next) => {
  request.session.destroy(() => {
    response.redirect("/login"); //Este código se ejecuta cuando la sesión se elimina.
  });
};

exports.getCrearUsuario = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';

    // Llamada a fetchAll para obtener roles
    Rol.fetch().then(([roles]) => {
        response.render('crearUsuario', {
            username: request.session.username || '',
            registro: true,
            csrfToken: request.csrfToken(),
            error: error,
            permisos: request.session.permisos || [],
            roles: roles  // Agrega los roles obtenidos a los datos de la vista
        });
    }).catch(err => {
        console.error('Error fetching roles:', err);
        response.status(500).send('Error cargando la pagina');
    });
};


exports.postCrearUsuario = (request, response, next) => {
    const nuevo_usuario = new Usuario(
        request.body.username, request.body.name, request.body.password, request.body.idrol
    );
    nuevo_usuario.save()
        .then(() => {
            response.redirect('/gestionUsuarios');
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Ese usuario ya existe';
            response.redirect('/gestionUsuarios/crearUsuario');
        });
};

// Modificar usuario
exports.getModificarUsuario = (request, response, next) => {

  Rol.fetch().then(([roles]) => { 
    // Buscar el usuario correspondiente en la base de datos utilizando su username
    return Usuario.fetchOneWithRole(request.params.username)
      .then(([usuarios, fieldData]) => {
        response.render("modificarUsuarios", {
          username: request.session.username || "",
          csrfToken: request.csrfToken(),
          permisos: request.session.permisos || [],
          roles: roles,
          // Pasar la información del usuario que se va a editar
          usuario: usuarios[0], // Tomar el primer elemento del arreglo de usuarios (asumiendo que fetchOne devuelve solo uno)
    
        });
      });
  }).catch((error) => {
      console.log(error);
  });
};

exports.postModificarUsuario = (request, response, next) => {
  Usuario.update(request.body.username, request.body.nombre, request.body.idrol)
    .then(([rows, fieldData]) => {
      // Redirigir al usuario de vuelta a la gestión de usuarios una vez que la actualización se complete con éxito
      request.session.mensaje=`El usuario ${request.body.username} fue modificado correctamente`;
      Usuario.fetchUsuariosConRoles()
        .then(([users, fieldData]) => {
            response.render('gestionUsuarios', {
                usuarioRegistrado: users,
                permisos: request.session.permisos || [],
                csrfToken: request.csrfToken(),
                mensaje: request.session.mensaje
            });
        })
        
        .catch((error) => {
            console.log(error);
            response.status(500).send("Error al obtener usuarios registrados");
        });
      
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postCrearUsuario = (request, response, next) => {
  const nuevo_usuario = new Usuario(
      request.body.username, request.body.name, request.body.password, request.body.idrol
  );
  nuevo_usuario.save()
      .then(() => {
          response.redirect('/gestionUsuarios');
      })
      .catch((error) => {
          console.log(error);
          request.session.error = 'Ese usuario ya existe';
          response.redirect('/gestionUsuarios/crearUsuario');
      });
};


// Cambiar contraseña
exports.get_modificarContrasena = (request, response, next) => {
    Usuario.fetchOneWithRole(request.params.username)
        .then(([usuarios, fieldData]) => {
            response.render('modificarUsuario', {
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
                // Pasar la información del usuario que se va a editar
                usuario: usuarios[0], // Tomar el primer elemento del arreglo de usuarios (asumiendo que fetchOne devuelve solo uno)
            });
        })
        .catch((error) => {
            console.log(error);
            // Manejo de errores
            response.status(500).send("Error al obtener el usuario para editar");
        });
};

exports.post_modificarConstrasena = (request, response, next) => {
    const username = request.body.username;
    const newPassword = request.body.password; // Nueva contraseña ingresada por el usuario

    // Lógica para actualizar la contraseña del usuario en la base de datos
    Usuario.updatePassword(username, newPassword)
        .then(([rows, fieldData]) => {
            // Redirigir al usuario de vuelta a la gestión de usuarios una vez que la actualización se complete con éxito
            response.redirect('/miPerfil');
        })
        .catch((error) => {
            console.log(error);
            // Manejo de errores
            response.status(500).send("Error al actualizar la contraseña del usuario");
        });
};

