const express = require('express');
const router = express.Router();

const multer = require('multer'); 
const path = require('path')
const productController = require("../controllers/productControllers");
const app = express();

const configMulter = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/imagenes'))
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
});
const upload = multer({storage: configMulter});

router.get("/list", productController.list);
router.get("/detail/:id", productController.detail);
//router.get('/products/productcart', productController.productCart);

router.get("/create", productController.create);
router.post("/create", upload.single("image"), productController.store);

router.get("/edit/:id", productController.edit);
router.put("/edit/:id", productController.update);

router.delete("/delete/:id", productController.destroy);

app.post("/products", upload.array("image"), function(req,res, next){
    console.log(req.files)
    res.send("entroooo :)")
  });
  

module.exports = router;