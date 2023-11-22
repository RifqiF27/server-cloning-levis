const express = require("express");
const router = express.Router();
const Controller = require('../controllers/user')

router.get("/", (req, res) => {
    res.send('Hellow')
});

router.get('/users', Controller.findAll)
router.post('/users', Controller.create)
router.get('/users/:id', Controller.findById)
router.delete('/users/:id', Controller.delete)

module.exports = router;
