const fs = require('fs')
const path = requir('path')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const dataJson = fs.readFileSync(path.join(__dirname, '../data/users.json'));
const users = JSON.parse(dataJson);

function updateUser() {
  const usersJSON = JSON.stringify(users, null, 4);
  fs.writeFileSync(path.join(__dirname, '../data/users.json'), usersJSON);
}

const userControllers=  {
    login: (req, res)=> {
        const resultError = validationResult(req)
        console.log(resultError);
        if(resultError.isEmpty()){
            const user = {
                name: req.body.name,
                email:  req.body.email,
            }
           //res.cookie('name', req.body.age, { maxAge: 60000 * 24 });
           req.session.user = user
           res.render('home', { user: user, email: req.body.email  });

        }else {
            res.render('home', { errors: resultError.array() })
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
        const errors = validationResult(req);
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
            imagen: imageFilename,
          };
          users.push(userNew);
          updateUser();
          res.redirect('/home');
        }
      },
}
module.exports = userControllers