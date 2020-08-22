const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/OrdersController');

router.get('/list',OrdersController.list);
router.post('/create',OrdersController.create);
router.get('/get/:Orderno', OrdersController.get);
router.post('/update/:Orderno',OrdersController.update);
router.get('/delete/:Orderno',OrdersController.delete);
router.post('/updateStatus/:Orderno',OrdersController.updateStatus);
router.get('/countall',OrdersController.countall);
router.get('/getClientdescriptionByOrders/:Orderno', OrdersController.getClientdescriptionByOrders);

module.exports = router;