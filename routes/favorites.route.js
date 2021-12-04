const express = require('express');
const favoritesController = require('../controllers/favorites.controller')
const router = express.Router();


router.post('/newFavorites/', (req, res) => {
    favoritesController.addNewFavorites(req, res);
})
router.get('/getAllFavoritesByUser/:id', (req, res) => {
    favoritesController.getAllFavoritesByUser(req, res);
})
router.put('/updateUserFavorites/:id', (req, res) => {
    favoritesController.updateUserFavorites(req, res);
})

module.exports = router;