const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');
const moment = require('moment');
//const { ValidationResults } = require(express-validator)

const productControllers = {
    list: (req, res) => {
        db.Product.findAll()
        .then(products => {
            res.render('./products/list-product.ejs', { products })
        }) 
        .catch(error => {
            console.error(error);
            res.status(500).send('Hubo un error al obtener los productos');
        });
    }, 
    detail: (req,res) => {
        db.Product.findByPk(req.params.id)
        .then((product) => {
            res.render('./products/productdetail', { product })   
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Hubo un error al obtener el detalle del producto');
        });
    },
    
    productCart: (req, res) => {
        return res.render('productCart');
    },
    /*create: (req, res) => {
        res.render('./products/create-product');
    },*/
    create: (req, res) => {
        db.Categoria.findAll()
        .then( categoria => {
            return res.render('./products/create-product', { categoria });
        })  
    },
    store: (req, res) => {
        const form = req.body;
        const nameFile = req.file.filename;
        console.log('Valor de form.Idcategoria:', form.Idcategoria);
        db.Product.create ({
            Nombre: form.Nombre,
            Descripcion: form.Descripcion,
            Categoria: form.Categoria,
            Color: form.Color,
            Precio: form.Precio,
            Marca: form.Marca,
            Imagen: nameFile /*,
            stock: form.stock,
            fecha_creacion: new Date().toLocaleDateString(),
            fecha_modificacion: new Date().toLocaleDateString()*/
        })
        .then((newProduct) => {
            console.log(newProduct);
            res.redirect('/products/list');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Hubo un error al crear el producto');
        });
    },    
    edit: (req, res) => {
        const category = db.Categoria.findAll();
        const product = db.Product.findByPk(req.params.id);
            
        Promise.all([category, product])
        .then(function ([category, product]) {
            //return res.send(product)
            res.render('./products/edit-product', { product, category });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Hubo un error al editar el producto');
        });
    },
    update: (req, res) => {
        const id = req.params.id;
        const form = req.body;
        const nameFile = req.file.filename;
        db.Product.update(
            {
                Nombre: form.Nombre,
                Precio: form.Precio,
                category: form.category,
                Descripcion: form.Descripcion,
                Color: form.Color,
                Imagen: nameFile,
                Marca: form.Marca
                /*stock: form.stock,
                fecha_modificacion: new Date().toLocaleDateString()*/
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        .then(() => {
            res.redirect('/products/list');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Hubo un error al actualizar el producto');
        });
    },
    delete: function (req, res) {
        db.Product.findByPk(req.params.id)
        .then((product) => {
            res.render("./products/delete.ejs", { product });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Hubo un error al buscar el producto para eliminar');
        });
    },
    destroy : (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then(() => {
            res.redirect('/products/list');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Hubo un error al eliminar el producto');
        });
    }    
};
 
module.exports = productControllers;