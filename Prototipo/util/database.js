const mysql = require('mysql2');

// Establecer el servidor

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'crafted_ratings', // Nombre del esquema en mySQL workbench
    password: 'mAuRiX2920_'// Contraseña de tu conexion 
});

module.exports = pool.promise();