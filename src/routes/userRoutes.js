const express = require('express')
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/', userController.getAllUsers)
router.get('/userId', userController.getUserByUserId)
router.post('/createCustomer', userController.createCustomer)
router.get('/getAllCustomers', userController.getAllCustomers)
router.get('/getCustomerById', userController.getCustomerById)
router.put('/updateCustomerById', userController.updateCustomerById)
router.delete('/deleteCustomerById', userController.deleteCustomerById)

module.exports = router;