const fs = require("fs");
const path = require('path');
const dataJson = fs.readFileSync(path.join(__dirname, "../data/productos.json"));
const products = JSON.parce(dataJson);
const productControllers = {
    listProduct: (req, res)=>{
        res.render("list-products", {products: products})
    },
    productdetail: (req, res)=>{
        const idProduct = req.params.idProduct;
        const productFound = products.filter(product => product.id == idProduct);
        res.render("productdetail", {products: productFoud[0]})
    }
};
 
module.exports = productsControllers;