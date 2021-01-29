
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
router.get('/AllOrders',OrdersProduitController.AllOrders);
router.get('/getNbOrdersByMonth',OrdersProduitController.getNbOrdersByMonth);
router.get('/listProduct',OrdersProduitController.listProduct);
router.get('/listValidatedProductOrders',OrdersProduitController.listValidatedProductOrders);
router.get('/listDraftProductOrders',OrdersProduitController.listDraftProductOrders);
router.get('/listRejectedProductOrders',OrdersProduitController.listRejectedProductOrders);
router.get('/listCreatedProductOrders',OrdersProduitController.listCreatedProductOrders);
router.get('/listWaitingValidationProductOrders',OrdersProduitController.listWaitingValidationProductOrders);
router.get('/listInProgressProductOrders',OrdersProduitController.listInProgressProductOrders);
router.get('/listSuspendedProductOrders',OrdersProduitController.listSuspendedProductOrders);
router.get('/listPaidProductOrders',OrdersProduitController.listPaidProductOrders);
router.get('/listPartiallyPaidProductOrders',OrdersProduitController.listPartiallyPaidProductOrders);
router.get('/getNborderbyVolume',OrdersProduitController.getNborderbyVolume);
router.get('/getNborderbyStatus',OrdersProduitController.getNborderbyStatus);
router.get('/productPayment/:amount/:Orderno',OrdersProduitController.productPayment);
router.get('/totalProfitProduct',OrdersProduitController.totalProfitProduct);
router.get('/amountStillToPay/:Orderno',OrdersProduitController.amountStillToPay);

module.exports = router;