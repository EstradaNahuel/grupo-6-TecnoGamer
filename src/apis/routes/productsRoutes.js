const express = require('express');
const router = express.Router();
const productsControllers = require('../../apis/controllers/productsController');

router.get('/products', productsControllers.list);
router.get('/products/:id', productsControllers.show);

module.exports = router;