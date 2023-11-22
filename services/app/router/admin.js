const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllerAdmin')


router.get('/', (req,res) =>{
    res.send('Welcome!')
})

router.get('/products', Controller.showProduct)
router.post('/products', Controller.createProduct)
router.get('/products/:id', Controller.showOneProduct)
router.put('/products/:id', Controller.editProduct)
router.delete('/products/:id', Controller.deleteProduct)
router.get('/categories', Controller.showCategory)
router.post('/categories', Controller.createCategory)
router.get('/categories/:id', Controller.showOneCategory)
router.put('/categories/:id', Controller.editCategory)
router.delete('/categories/:id', Controller.deleteCategory)





module.exports = router