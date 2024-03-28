const usuarioRegistrado = [
    {
        username:"Vale",
        nombre: "Valeria Zúñiga", 
        rol: "crm", 
    },
    {
        username:"Nico",
        nombre: "Nicolas Hood", 
        rol: "Administrador", 
    },
    {
        username:"Xime",
        nombre: "Ximena Cantera", 
        rol: "Analítico", 
    }
];

module.exports = class UsuarioRegistrado{

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_username, mi_nombre, mi_rol) {
        this.username = mi_username;
        this.nombre = mi_nombre;
        this.rol = mi_rol;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        usuariosRegistrados.push({
            username: this.username,
            nombre: this.nombre,
            rol: this.rol,
        });
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return usuarioRegistrado;
    }

}