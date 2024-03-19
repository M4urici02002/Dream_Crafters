const Producto = require('../models/producto.model');

exports.get_agregarProducto = (request, response, next) => {
    response.render('agregarProducto', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        editar:false,
    });
};

exports.post_agregarProducto = (request, response, next) => {
    console.log(request.body);
    const mi_producto = new Producto(
        request.body.clase, 
        request.body.precioProducto, 
        request.body.imagen
    );
    
    mi_producto.save()
        .then(([rows, fieldData]) => {
            response.setHeader('Set-Cookie', 'ultimo_producto=' + mi_producto.clase + '; HttpOnly');
            response.redirect('/catalogo');
        }).catch((error) => {
            console.log(error);
        });

};

exports.get_catalogo = (request, response, next) => {
    console.log(request.cookies);
    console.log(request.cookies.ultimo_producto);

    //Producto.fetchAll().then(([rows, fieldData]) => {
        Producto.fetch(request.params.IDProducto).then(([rows, fieldData]) => {
        //console.log(fieldData);
        response.render('catalogo', {
            producto: rows, 
            ultimo_producto: request.cookies.ultimo_producto || '',
            username: request.session.username || '',
            permisos: request.session.permisos || [],
        });
    })
    .catch((error) => {
        console.log(error)
    });
};

exports.get_editar = (request, response, next) => {
    // Buscar el producto correspondiente en la base de datos utilizando su ID
    Producto.fetchOne(request.params.IDProducto)
        .then(([productos, fieldData]) => {
            // Renderizar la vista 'agregarProducto'
            response.render('agregarProducto', {
                // Pasar el datos de usuario y genera un token CSRF para protección contra CSRF
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
                // Indicar que se está editando un producto
                editar: true,
                // Pasar la información del producto que se va a editar
                producto: productos[0], // Tomar el primer elemento del arreglo de productos (asumiendo que fetchOne devuelve solo uno)
            });
        })
        .catch((error) => {
            console.log(error)
        });
};

// Función para guardar los cambios realizados en la edición de un producto
exports.post_editar = (request, response, next) => {
    Producto.update(request.body.IDProducto,         
                    request.body.clase, 
                    request.body.precioProducto, 
                    request.body.imagen)
        .then(([rows, fieldData]) => {
            // Redirigir al usuario de vuelta al catálogo de productos una vez que la actualización se complete con éxito
            response.redirect('/catalogo');
        })
        .catch((error) => {
            console.log(error)
        });
};
