const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');
app.use(session({
  secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Protección ataques de CSRF
const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

// Rutas

const { getMarcas } = require('./controllers/marcas.controller');
// Aplica el middleware globalmente
app.use(getMarcas);

app.use((req, res, next) => {
  // Obtener la marca seleccionada de las cookies
  const marcaSeleccionada = req.cookies['marcaSeleccionada'] || 'LUUNA'; // 'LUUNA' como valor por defecto

  // Hacer la marca seleccionada disponible en todas las vistas
  res.locals.marcaSeleccionada = marcaSeleccionada;
  next();
});


const rutasMiPerfil = require('./routes/miPerfil.routes')
app.use('/miPerfil', rutasMiPerfil);

const rutasConfiguracion = require('./routes/configuracion.routes')
app.use('/configuracion', rutasConfiguracion);

const rutasTemplate = require('./routes/template.routes');
app.use(rutasTemplate);

const rutasEncuestas = require('./routes/encuesta.routes');
app.use(rutasEncuestas);

const categoriaController = require('./controllers/categoria.controller');
app.use(categoriaController.getCategorias);

const rutasResena = require('./routes/resena.routes');
app.use(rutasResena);

const rutasGraficas = require('./routes/graficas.routes');
app.use('/graficas', rutasGraficas);

const rutasReporte = require('./routes/reporte.routes');
app.use('/reporte', rutasReporte);

const rutasUsuarios = require('./routes/gestionUsuarios.routes');
app.use(rutasUsuarios);

const rutasRoles = require('./routes/gestionRoles.routes');
app.use(rutasRoles); 

const rutasEditarRol = require('./routes/editarRol.routes');
app.use('/editarRol', rutasEditarRol);

const rutasUser = require('./routes/users.routes');
app.use('/', rutasUser);

const rutasRol = require('./routes/rol.routes');
app.use('/', rutasRol);

// Si no existe la URL html de error 404
// Si no existe la URL html de error 404
app.use((request, response, next) => {
  response.status(404);
  response.sendFile(path.join(__dirname, 'views', '404.html')); //Manda la respuesta
});


app.listen(3000);