const mysql = require('mysql2');

//Como establecer el servidor??

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: '', //nombre de tu esquema en workbench
    password: ''//contraseña de tu conexion 
});

module.exports = pool.promise();