var express = require('express');
var router = express.Router();
var controllerPath = '../../controllers/web/',
	main = require(controllerPath + 'index');
router.get('/', main.index); 
router.get('/orders', main.orders); 
router.get('/textproxy',main.textproxy);
router.get('/boys',main.boys);
















module.exports = router;