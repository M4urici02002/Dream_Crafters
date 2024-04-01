const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Middleware
app.use((request, response, next) => {
  console.log('Middleware!');
  next(); 
});

// Rutas 
const rutasMiPerfil = require('./routes/miPerfil.routes')
app.use('/miPerfil', rutasMiPerfil);

const rutasConfiguracion = require('./routes/configuracion.routes')
app.use('/configuracion', rutasConfiguracion);

const rutasLogin = require('./routes/login.routes');
app.use('/', rutasLogin);

const rutasTemplate = require('./routes/template.routes');
app.use('/template', rutasTemplate);

const rutasResena = require('./routes/resena.routes');
app.use('/resena', rutasResena);

const rutasGraficas = require('./routes/graficas.routes');
app.use('/graficas', rutasGraficas);

const rutasUsuarios = require('./routes/gestionUsuarios.routes');
app.use(rutasUsuarios);

const rutasRoles = require('./routes/gestionRoles.routes');
app.use('/gestionRoles', rutasRoles); 

const rutasModUsua = require('./routes/modificarUsuarios.routes');
app.use('/modificarUsuarios', rutasModUsua);

const rutasNewRol = require('./routes/NuevoRol.routes');
app.use('/NuevoRol', rutasNewRol);

const rutasEditarRol = require('./routes/editarRol.routes');
app.use('/editarRol', rutasEditarRol);

app.listen(3000);