const mysql = require('mysql2');

// Establecer el servidor

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'nicohood',
    database: 'crafted_ratings', // Nombre del esquema en mySQL workbench
    password: 'mAuRiX2920_'// Contraseña de tu conexion 
});

module.exports = pool.promise();