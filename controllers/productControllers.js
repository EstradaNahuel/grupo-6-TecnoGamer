const fs = require('fs');
const path = require('path');

const dataJson = fs.readFileSync(path.join(__dirname, "../data/products.json"));

const products = JSON.parse(dataJson, 'utf-8');


function addProduct(product){
    products.push(product);
    res.send("entro metodo addProduct");
    const productString = JSON.stringify(products, null, 4);
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), productString);
};

function updateProducts(){
    const productString = JSON.stringify(products, null, 4);
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), productString);
};

function deleteProducts(productsNew){
	const productsString = JSON.stringify(productsNew, null, 4)
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsString);
}

const productControllers = {
    list: (req, res)=>{
        res.render('./products/list-product.ejs', { products: products})
    }, /*
    detail: (req, res) => {
        const idProduct = req.params.id
        const productFound = products.filter( elem => elem.id == idProduct)

        res.render('./products/productdetail', { productFound: productFound[0]})
    */
    detail: function(req,res){
    let id = req.params.id;
    let productFound = products.find(function(product){
        return product.id == id;
    })
    res.render('./products/productdetail', {product: productFound})
    /*
    detail: (req, res) => {
        let productFound = products.find((x) => x.id == req.params.id);
        res.render('./products/productdetail', { product: productFound });
    */
    },
    //productCart: (req, res) => {
     //   return res.render('./products/productcart');
    //},
    create: (req, res)=>{
        res.send("entro a create")
        res.render('./products/create-product');
    },
    store: (req, res)=>{
        const form = req.body;
        const nameFile = req.file.filename;
		const pos = products.length-1;

        const newProduct = {
            id: products[pos].id + 1 ,
            name: form.name,
            description: form.description,
            price: form.price,
            image: nameFile
        }
        addProduct(newProduct);
        res.redirect('/products/list');
    },
    edit: (req, res)=> {
        const idProduct = req.params.id
        const productFound = products.find(function(elem){
            return elem.id == idProduct   
        })
        res.render('./products/edit-product', { productFound: productFound });
    },
    update: (req, res) => {
        const id = req.params.id
        const form = req.body;
        const nameFile = req.file.filename
        const productFound = products.find(function(elem){
            return elem.id == id
       
    })
        productFound.name = form.name;
        productFound.description = form.description;
        productFound.price = form.price;
        productFound.image = nameFile;

        updateProducts();

        res.redirect('/products/list');
    },
    destroy: (req, res) => {
        const idProduct = req.params.id;
		const productsNew = products.filter( elem => elem.id != idProduct );
		deleteProducts(productsNew);
		res.redirect('/products/list');
        
      },
};
 
module.exports = productControllers;