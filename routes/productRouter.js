const express = require("express");
const router = express.router();
const productControllers = require("../controllers/productControllers.js");
const multer = require("multer"); 

const configMulter = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage:configMulter});

router.get("/list", productControllers.listProduct);
router.get("/:id", productControllers.productDetail);
router.get("/create/", productControllers.create);
router.get("/create/", upload.single("image"), productControllers.store);
router.get("/update/:id/edit", productControllers.edit);
router.put("/update/:id", productControllers.update);
router.delate("/:id", productControllers.destroy);

module.exports = router;