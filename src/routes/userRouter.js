const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
//const { body, check } = require ('express-validator');
const multer = require('multer');
const path = require("path")
const validations = require('../validator/validation');

/*
const validation = [
    body('name')
        .notEmpty()
        .withMessage('Campo vacio'),
    body('email')
        .notEmpty()
        .withMessage('Campo vacio')
        .bail()
        .isEmail()
        .withMessage('formato invalido')
        .bail()
        .custom((value) => {
        const userFound = users.find((user) => user.email === value);
        if (!userFound) {
          return false;
        }
        return true;
        })
]
*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/user');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage })
/*
router.post('/login', function(req, res){
    if(req.session.user){

        res.send('El usuario ' + req.session.user.name  + ' con la edad:'+  req.cookies.age + 'esta en sesión!');
    }else{
        res.send('No existe el usuario en sesión!');
    }
})*/
router.get("/login", validations["login"], userControllers.login)
router.post("/login", userControllers.logging);
/*
router.get('/logout', function(req, res){
    req.session.destroy();
    res.clearCookie('age');
    res.send('cerraste sesión!');
})
*/
router.get("/register", userControllers.register)
router.post("/register", upload.single('imagen_de_perfil'), validations["register"], userControllers.processRegister)

module.exports = router;