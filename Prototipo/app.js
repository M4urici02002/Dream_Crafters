const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//Middleware
app.use((request, response, next) => {
  console.log('Middleware!');
  next(); 
});

// Rutas 
const rutasMiPerfil = require('./routes/miPerfil.routes')
app.use('/miPerfil', rutasMiPerfil);

const rutasLogin = require('./routes/login.routes');
app.use('/', rutasLogin);

const rutasTemplate = require('./routes/template.routes');
app.use('/template', rutasTemplate);

const rutasResena = require('./routes/resena.routes');
app.use('/resena', rutasResena);

const rutasGraficas = require('./routes/graficas.routes');
app.use('/graficas', rutasGraficas);

app.listen(3000);