const express = require('express');
const router = express.Router();

const ClientController = require('../controllers/ClientController');

router.get('/list',ClientController.list);
router.post('/create',ClientController.create);
router.get('/get/:clientno', ClientController.get);
router.post('/update/:clientno',ClientController.update);
router.get('/delete/:clientno',ClientController.delete);


module.exports = router;