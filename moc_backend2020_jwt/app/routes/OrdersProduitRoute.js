
const express = require('express');
const router = express.Router();

const OrdersProduitController = require('../controllers/OrdersProduitController');

router.get('/list/:userId',OrdersProduitController.list);
router.post('/create',OrdersProduitController.create);
router.get('/get/:Orderno', OrdersProduitController.get);
router.post('/update/:Orderno',OrdersProduitController.update);
router.get('/delete/:Orderno',OrdersProduitController.delete);
router.post('/updateStatus/:Orderno',OrdersProduitController.updateStatus);
router.get('/countall',OrdersProduitController.countall);
router.get('/countProductOrdersByStatus/:userId/:status',OrdersProduitController.countProductOrdersByStatus);
router.get('/getClientdescriptionByOrdersProduit/:Orderno', OrdersProduitController.getClientdescriptionByOrdersProduit);

module.exports = router;