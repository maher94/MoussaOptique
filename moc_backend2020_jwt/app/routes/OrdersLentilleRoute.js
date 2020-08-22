const express = require('express');
const router = express.Router();

const OrdersLentilleController = require('../controllers/OrdersLentilleController');

router.get('/list/:userId',OrdersLentilleController.list);
router.post('/create',OrdersLentilleController.create);
router.get('/get/:Orderno', OrdersLentilleController.get);
router.post('/update/:Orderno',OrdersLentilleController.update);
router.get('/delete/:Orderno',OrdersLentilleController.delete);
router.post('/updateStatus/:Orderno',OrdersLentilleController.updateStatus);
router.get('/countLensesOrdersByStatus/:userId/:Status',OrdersLentilleController.countLensesOrdersByStatus);
router.get('/getClientdescriptionByOrdersLentille/:Orderno', OrdersLentilleController.getClientdescriptionByOrdersLentille);

module.exports = router;