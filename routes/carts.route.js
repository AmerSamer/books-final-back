const express = require('express');
const cartsController = require('../controllers/carts.controller')
const router = express.Router();


router.post('/newCarts/', (req, res) => {
    cartsController.addNewCart(req, res);
})
router.get('/getAllcartsByUser/:id', (req, res) => {
    cartsController.getAllcartsByUser(req, res);
})
router.delete('/deleteBookCart/:id', (req, res) => {
    cartsController.deleteUserCart(req, res);
})
router.put('/updateBuyCart/:id', (req, res) => {
    cartsController.updateBuyCart(req, res);
})
module.exports = router;