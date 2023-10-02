const express = require('express');
const router = express.Router();

const multer = require('multer'); 
const path = require('path')
const productController = require("../controllers/productControllers");

const configMulter = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/imagenes'))
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: configMulter});

router.get("/products/list", productController.list);
router.get("/products/:id", productController.detail);
//router.get('/products/productcart', productController.productCart);

router.get("/products/create/:id", productController.create);
router.post("/products/create/:id", upload.single("image"), productController.store);

router.get("/products/edit/:id", productController.edit);
router.put("/products/edit/:id", productController.update);

router.delete("/delete/:id", productController.destroy);

module.exports = router;