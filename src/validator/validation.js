const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dataJson = fs.readFileSync(path.join(__dirname, '../data/users.json'));
const users = JSON.parse(dataJson);

const validation = {
  login: [
    body('email')
      .notEmpty()
      .withMessage('El campo email no puede estar vacío')
      .bail()
      .isEmail()
      .withMessage('Debe ingresar un email válido')
      .bail()
      .custom((value) => {
        const userFound = users.find((user) => user.email === value);
        if (!userFound) {
          return false;
        }
        return true;
      })
      .withMessage('El email no está registrado')
      .bail()
      .custom((value, { req }) => {
        const userFound = users.find((user) => user.email === req.body.email);
        if (!bcrypt.compareSync(req.body.password, userFound.password)) {
          return false;
        }
        return true;
      })
      .withMessage('La contraseña es incorrecta'),
    body('password')
      .notEmpty()
      .withMessage('El campo contraseña no puede estar vacío'),
  ],
  registered: [
    body('firstname')
      .notEmpty()
      .withMessage('El campo nombre no puede estar vacío')
      .bail()
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener al menos 3 caracteres'),
    body('surname')
      .notEmpty()
      .withMessage('El campo apellido no puede estar vacío')
      .bail()
      .isLength({ min: 4 })
      .withMessage('El apellido debe tener al menos 4 caracteres'),
    body('name')
      .isLength({ min: 4 })
      .withMessage('El nombre de usuario debe tener al menos 4 caracteres'),
    body('email')
      .notEmpty()
      .withMessage('El campo email no puede estar vacío')
      .bail()
      .isEmail()
      .withMessage('Debe ingresar un email válido')
      .bail()
      .custom((value) => {
        let userFound = users.find((user) => user.email === value);
        if (userFound) {
          return false;
        }
        return true;
      })
      .withMessage('El email ya está registrado'),
    body('password')
      .notEmpty()
      .withMessage('El campo contraseña no puede estar vacío')
      .bail()
      .isLength({ min: 8 })
      .withMessage('La contraseña debe tener al menos 8 caracteres'),
    ,
    body('imagen')
      .custom((value, { req }) => {
        return req.file;
      })
      .withMessage('Debes subir una imagen')
      .bail()
    ],

};

module.exports = validation;