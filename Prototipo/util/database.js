const mysql = require('mysql2');

// Establecer el servidor

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'crafted_ratings', // Nombre del esquema en mySQL workbench
    password: 'vazume159'// Contraseña de tu conexion 
});

module.exports = pool.promise();