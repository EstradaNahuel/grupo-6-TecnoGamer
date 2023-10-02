const fs = require('fs');
const path = require('path');

const dataJson = fs.readFileSync(path.join(__dirname, "../data/products.json"));

const products = JSON.parse( fs.readFileSync(dataJson, 'utf-8'));


function addProduct(Product){
    products.push(Product);
    const productString = JSON.stringify(products, null, 4);
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), productString);
};

function updateProducts(){
    const productString = JSON.stringify(products, null, 4);
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), productString);
};

function deleteProducts(productsNuevos){
	const productsString = JSON.stringify(productsNuevos, null, 4)
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsString);
}

const productControllers = {
    list: (req, res)=>{
        res.render('./products/list-product.ejs', { product: products})
    },
    detail: (req, res) => {
        const idProduct = req.params.id
        const productFound = products.filter( elem => elem.id == idProduct)

        res.render('/products/productdetail', { productFound: productFound[0]})

    },
    productCart: (req, res) => {
        return res.render('productCart');
    },
    create: (req, res)=>{
        res.render('create-product');
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
        res.render('edit-product', { productFound: productFound });
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
		const productsNuevos = products.filter( elem => elem.id != idProduct );
		deleteProducts(productsNuevos);
		res.redirect('/products/list');
        
      },
};
 
module.exports = productControllers;