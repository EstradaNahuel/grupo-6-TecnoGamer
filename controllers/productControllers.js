const fs = require('fs');
const path = require('path');
const dataJson = fs.readFileSync(path.join(__dirname, "../data/products.json"));
const products = JSON.parse(dataJson);

function addProduct(newProduct){
    products.push(newProduct);
    const productString = JSON.stringify(products, null, 4);
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), productString);
};

function updateProducts(){
    const productString = JSON.stringify(products, null, 4);
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), productString);
};

const productControllers = {
    listProduct: (req, res)=>{
        res.render('./products/list-products', {products : products})
    },
    productdetail: (req, res) => {
        const id = req.params.id
        const productFound = products.find(function(products){
            return plato.id == id
        })
        res.render('./products/productdetail', { products: productFound });
    
    },
    
    create: (req,res)=>{
        res.render('./products/create-product')
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
        res.render('./products/edit-product', { productFound: productFound });
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

        res.redirect('/products/list');
    },
    destroy: (req, res) => {
        let index = products.findIndex((x) => x.id == req.params.id);
        products.splice(index, 1);
        updateProducts();
        res.redirect('/products');
      },
};
 
module.exports = productControllers;