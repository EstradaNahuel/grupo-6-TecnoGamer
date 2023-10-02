const express= require("express");
const mainControllers = require("../controllers/mainControllers.js");
const router = express.Router();


router.get("/", mainControllers.home);

router.get("/register", mainControllers.register);

router.get("/login", mainControllers.login);
/*
router.get("/productcart", mainControllers.productcart);

router.get("/productdetail", mainControllers.detail);
*/

module.exports = router;