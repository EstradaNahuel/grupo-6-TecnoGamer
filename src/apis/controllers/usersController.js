const db = require('../../database/models');
const Op = db.Sequelize.Op;

const userApiControllers = {
    list: (req, res) => {
        db.Usuario
            .findAll()
            .then( usuarios => {

                let data = [];
                
                usuarios.forEach(user => {
                    let dataUser = {
                        Id: user.Id,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        nombre_de_perfil: user.nombre_de_perfil,
                        fecha_nacimiento: user.fecha_nacimiento,
                        email: user.email,
                        perfil: user.perfil,
                        imagen_de_perfil: user.imagen_de_perfil,
                        detail: "localhost:3020/api/users/" + user.Id
                    };
                    data.push(dataUser);
                });
                return res.json({
                    total: usuarios.length,
                    data: data,

                })
            } )
    },
    show: (req, res) => {
        db.Usuario
            .findByPk(req.params.id)
            .then( usuario => {
                return res.json({
                    data: {
                        Id: usuario.Id,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        nombre_de_perfil: usuario.nombre_de_perfil,
                        perfil: usuario.perfil,
                        email: usuario.email,
                        imagen_de_perfil: "http://yourdomain.com/user" + usuario.imagen_de_perfil,
                        fecha_nacimiento: usuario.fecha_nacimiento
                    }
                })
            } )
    }
}

module.exports = userApiControllers;
