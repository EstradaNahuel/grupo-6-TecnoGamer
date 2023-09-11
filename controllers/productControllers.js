const fs = require("fs");
const path = require('path');
const dataJson = fs.readFileSync(path.join(__dirname, "../data/productos.json"));
const products = JSON.parce(dataJson);

function addProduct(products){
    products.push(products);
    const productString = JSON.stringify(products);
    fs.writeFileSync(path.join(__dirname, "../data/productos.json"), productString);
};
function updateProducts(){
    const productString = JSON.stringify(products);
    fs.writeFileSync(path.join(__dirname, "../data/productos.json"), productString);
};

const productControllers = {
    listProduct: (req, res)=>{
        res.render("list-products", {products: products})
    },
    productdetail: (req, res)=>{
        const idProduct = req.params.idProduct;
        const productFound = products.filter(product => product.id == idProduct);
        res.render("productdetail", {products: productFoud[0]})
    },
    create: (req,res)=>{
        res.render("create-product")
    },
    store: (req, res)=>{
        const form = req.body;
        console.log(form);
        const newProduct = {
            id: products.length + 1 ,
            name: form.name,
            description: form.description,
            price: form.price,
        }
        addProduct(newProduct);
        res.redirect('/products/list');
    },
    edit: (req, res)=> {
        const id = req.params.id
        const productFound = products.find(function(product){
            return product.id == id
        })
    },
    update: (req, res) => {
        const id = req.params.id
        const form = req.body;
        const productFound = products.find(function(product){
            return product.id == id
    })
        productFound.name = form.name;
        productFound.description = form.description;
        productFound.price = form.price;

        updateProducts();

        res.redirect('/product/list');
    }
};
 
module.exports= productControllers;