const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controllerUser");


router.get('/products', Controller.showProduct)
router.get('/products/:id', Controller.showOneProduct)


module.exports = router;
