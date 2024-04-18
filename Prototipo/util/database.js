const mysql = require('mysql2');

// Establecer el servidor

const pool = mysql.createPool({
    host: 'localhost',
    user: 'nicohoos',
    database: 'crafted_ratings', // Nombre del esquema en mySQL workbench
    password: '12345678'// Contraseña de tu conexion 
});

module.exports = pool.promise();