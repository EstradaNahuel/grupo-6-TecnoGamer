const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs');
const multer = require('multer');
const db = require('../database/models');
const sequelize = db.sequelize;
const { validation } = require('express-validator');

const userControllers =  { 

  register: (req, res) => {
    return res.render('./users/register');
  },
  processRegister: (req, res) => {
    // Validación de datos
    if (!req.body || !req.file) {
      return res.status(400).send('Datos de formulario o archivo no proporcionados');
    }
  
    const form = req.body;
    const newImage = req.file ? './public/user' + req.file.filename : '';
  
    // Validación de contraseña
    if (!form.password || form.password.length < 8) {
      return res.status(400).send('La contraseña debe tener al menos 8 caracteres');
    }
  
    const hashPassword = bcrypt.hashSync(form.password, 10);
  
    db.Usuario.create({
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      password: hashPassword,
      nombre_de_perfil: form.nombre_de_perfil,
      perfil: form.perfil,
      fecha_nacimiento: form.fecha_nacimiento,
      imagen_de_perfil: newImage 
    }).then((newUser) => {
      console.log(newUser);
      return res.redirect("/");
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Hubo un error al registrar el usuario');
    });
  },
  login: (req, res) => {
    return res.render('./users/login');
  },
  logging: (req, res) => {
    const form = req.body;
    db.Usuario.findOne({
        where: {
            email: form.email,
        },
    })
    .then((user) => {
        if (user && bcrypt.compareSync(form.password, user.password)) {
            req.session.user = user;
            return res.redirect("/");
        } else {
            return res.render('users/login', { error: 'Email o contraseña incorrectos' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Hubo un error al iniciar sesión');
    });
  },
}
module.exports = userControllers