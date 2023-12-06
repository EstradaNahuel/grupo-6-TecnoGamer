const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs');
const multer = require('multer');
const db = require('../database/models');
const sequelize = db.sequelize;
const { validation } = require('express-validator');

const userControllers=  {
  /*register: (req, res) => {
    return res.render('./users/register');
  },
  registered: (req, res) => {
    const form = req.body;
    const newImage = req.file ? './public/users' + req.file.filename : '';
    const hashPassword = bcrypt.hashSync(form.password, 10);
    console.log(req.body)
    console.log(req.file)
    db.Usuario.create({
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      password: hashPassword,
      perfil: form.perfil,
      fecha_nacimiento: form.fecha_nacimiento,
      imagen: newImage 
    }).then((newUser) => {
      console.log(newUser);
      return res.redirect("/");
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Hubo un error al registrar el usuario');
    });
  },*/
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
            return res.render('login', { error: 'Email o contraseña incorrectos' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Hubo un error al iniciar sesión');
    });
  },
    /*login: (req, res) => {
        res.render('./users/login');
    },
    Logging : (req, res) => {
      let userFound = users.find((user) => req.body.email == user.email);
      if(userFound) {
        let correctPassword = bcrypt.compareSync(req.body.password, userFound.password)
        if(correctPassword){
          delete userFound.password;
          req.session = userFound;
          if(req.body.rememberMe){
            res.cookie('userEmail', req.body.email, { maxAge: 1000 * 120})
          }
          return res.redirect(301, '/')
        }
        return res.render('login', {
          errors: {
            email: {
              msg: "no es el mismo email"
            }
          }
        })
      }else{
      return res.render('login', {
         errors: 
          { email: 
            { msg: "El email no esta regitrado" }
          } 
        })
      }  
    },
    Logged: (req, res) => {
        console.log(req.session);
        res.redirect('/home')
      },
    register: (req, res) => {
        res.render('register');
      },
    registered: (req, res) => {
        const errors = validation(req);
        if (!errors.isEmpty()) {
          return res.render('register', { errors: errors.errors, old: req.body });
        } else {
          const imageFilename = req.file ? req.file.filename : null;
          const userId = users[users.length - 1].id;
          const userNew = {
            id: userId + 1,
            name: req.body.name,
            firstname: req.body.firstname,
            surname: req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            admin: false,
            image: imageFilename,
          };
          users.push(userNew);
          updateUser();
          res.redirect('/home');
        }
      },*/
}
module.exports = userControllers