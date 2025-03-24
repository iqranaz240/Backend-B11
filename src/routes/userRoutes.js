const express = require('express')
const router = express.Router();
const userController = require('../controllers/userControllers');
const cloudinaryController = require('../controllers/imageUpload');
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
router.post('/uploadPhoto', cloudinaryController.uploadSingleImage);
router.get('/getAllImages', cloudinaryController.getAllImages);
router.delete('/deleteSingleImage', cloudinaryController.deleteImage);

module.exports = router;