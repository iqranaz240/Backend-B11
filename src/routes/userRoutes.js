const express = require('express')
const router = express.Router();
const userController = require('../controllers/userControllers');
const {checkAdmin, checkValidUser} = require('../middleware/authorization')

router.get('/', userController.getAllUsers)
router.get('/userId', userController.getUserByUserId)
router.post('/createCustomer', userController.createCustomer)
router.get('/getAllCustomers', checkAdmin, userController.getAllCustomers)
router.get('/getCustomerById', checkValidUser, userController.getCustomerById)
router.put('/updateCustomerById', userController.updateCustomerById)
router.delete('/deleteCustomerById', userController.deleteCustomerById)
router.post('/signup', userController.signupCustomer)
router.post('/login', userController.loginCustomer)

module.exports = router;