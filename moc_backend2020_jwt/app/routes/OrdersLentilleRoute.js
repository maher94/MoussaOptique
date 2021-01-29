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
router.get('/AllOrders',OrdersLentilleController.AllOrders);
router.get('/countPercentage',OrdersLentilleController.countPercentage);
router.get('/getNbOrdersByMonth',OrdersLentilleController.getNbOrdersByMonth);
router.get('/listALLOrders',OrdersLentilleController.listALLOrders);
router.get('/listLenses',OrdersLentilleController.listLenses);
router.get('/listValidatedLensesOrders',OrdersLentilleController.listValidatedLensesOrders);
router.get('/listDraftLensesOrders',OrdersLentilleController.listDraftLensesOrders);
router.get('/listRejectedLensesOrders',OrdersLentilleController.listRejectedLensesOrders);
router.get('/listCreatedLensesOrders',OrdersLentilleController.listCreatedLensesOrders);
router.get('/listWaitingValidationOrders',OrdersLentilleController.listWaitingValidationOrders);
router.get('/listInProgressLensesOrders',OrdersLentilleController.listInProgressLensesOrders);
router.get('/listSuspendedLensesOrders',OrdersLentilleController.listSuspendedLensesOrders);
router.get('/listPaidLensesOrders',OrdersLentilleController.listPaidLensesOrders);
router.get('/listPartiallyPaidLensesOrders',OrdersLentilleController.listPartiallyPaidLensesOrders);
router.get('/getNborderbyPss',OrdersLentilleController.getNborderbyPss);
router.get('/getNborderbyStatus',OrdersLentilleController.getNborderbyStatus);
router.get('/LensesPayment/:amount/:Orderno',OrdersLentilleController.LensesPayment);
router.get('/totalProfitLenses',OrdersLentilleController.totalProfitLenses);
router.get('/amountStillToPay/:Orderno',OrdersLentilleController.amountStillToPay);


module.exports = router;