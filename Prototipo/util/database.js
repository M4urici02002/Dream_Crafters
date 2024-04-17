const mysql = require('mysql2');

// Establecer el servidor

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'crafted_ratings', // Nombre del esquema en mySQL workbench
    password: ''// Contraseña de tu conexion 
});

module.exports = pool.promise();