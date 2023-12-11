const express = require('express');
const router = express.Router();
const usersControllers = require('../../apis/controllers/usersController');

router.get('/users', usersControllers.list);
router.get('/users/:id', usersControllers.show);

module.exports = router;