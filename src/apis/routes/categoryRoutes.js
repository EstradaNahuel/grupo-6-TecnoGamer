const express = require('express');
const router = express.Router();
const categoryController = require('../../apis/controllers/categoryController');

router.get('/categoria', categoryController.list);
router.get('/categoria/:id', categoryController.show);

module.exports = router;