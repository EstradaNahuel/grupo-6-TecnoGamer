const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs');
const { validation } = require('express-validator');

const dataJson = fs.readFileSync(path.join(__dirname, '../data/users.json'));
const users = JSON.parse(dataJson);

function updateUser() {
  const usersJSON = JSON.stringify(users, null, 4);
  fs.writeFileSync(path.join(__dirname, '../data/users.json'), usersJSON);
}

const userControllers=  {
    /*login: (req, res)=> {
        const resultError = validation(req)
        console.log(resultError);
        if(resultError.isEmpty()){
            const user = {
                name: req.body.name,
                email:  req.body.email,
            }
           //res.cookie('name', req.body.age, { maxAge: 60000 * 24 });
           req.session.user = user
           res.render('/home', { user: user, email: req.body.email  });

        }else {
            res.render('/home', { errors: resultError.array() })
        }
        
    },*/
    login: (req, res) => {
        res.render('.users/login');
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
      },
}
module.exports = userControllers