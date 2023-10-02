/*
const path = require('path');
*/
const mainControllers = {
    home: (req,res)=>{
        res.render("./users/index", {
            "title": "tecnogamer",
            "css":"styles"
        })
    },
    register: (req,res)=>{
        res.render("./users/register", {
            "title": "registro",
            "css":"register"
        })
    },
    login: (req,res)=>{
        res.render("./users/login", {
            "title": "ingreso",
            "css":"login"
        })
    },
    productcart: (req,res)=>{
        res.render("./products/productcart", {
            "title": "carrito compras",
            "css":"productcart"
        })
    } /*,
    productdetail: (req,res)=>{
        res.render("./products/productdetail", {
            "title": "detalles del producto",
            "css":"productdetail"
        })
    }
    */
}
 

module.exports = mainControllers;