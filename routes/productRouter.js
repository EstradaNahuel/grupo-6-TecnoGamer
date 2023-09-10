const express = require("express");
const router = express.router();
const productControllers = require("../controllers/productControllers.js");

router.get("/list", productControllers.listProduct);
router.get("/:id", productControllers.productDetail);

module.exports = router;