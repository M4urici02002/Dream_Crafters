const mysql = require('mysql2');

//Como establecer el servidor??

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'crafted_ratings', //nombrar todos el esquema asi
    password: '12345678'//contraseña de tu conexion 
});

module.exports = pool.promise();