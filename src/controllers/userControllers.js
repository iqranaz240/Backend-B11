const Customer = require("../models/customer");
const mongoose = require("mongoose")

const getAllUsers = (req, res) => {
    res.send('My all users');
}

const getUserByUserId = (req, res) => {
    res.send('Get user with given user ID')
}

const createCustomer = async (req, res) => {
    const customerData = req.body;
    try {
        const customer = new Customer(customerData);
        await customer.save();
        console.log('Customer created:', customer);
        res.status(200).json({ message: 'Customer created', customer });
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ message: 'Some error occurred', error: error.message });
    }
};

const getAllCustomers = async(req,res) => {
    try {
        const customer = await Customer.find();
        res.status(200).json({customer})
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({message: 'Error getting users', error: error})
    }
}

const getCustomerById = async(req,res) => {
    const customerId = req.query.customerId
    try {
        const customer = await Customer.findOne({customerId});
        if (customer) {
            res.status(200).json({customer})
        } else {
            res.status(404).json({message: 'Customer not found.'})
        }
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({message: 'Error getting users', error: error})
    }
}

const updateCustomerById = async(req, res) => {
    const customerId = req.query.customerId;
    const updateScript = {
        $set: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            contact: req.body.contact
        }
    };
    try {
        const customer = await Customer.updateOne({customerId}, updateScript);
        if (customer) {
            res.status(200).json({customer})
        } else {
            res.status(404).json({message: 'Customer not found.'})
        }
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({message: 'Error updating customer', error: error})
    }
}

const deleteCustomerById = async() => {

}

module.exports = { 
    getAllUsers, 
    getUserByUserId, 
    createCustomer, 
    getAllCustomers, 
    getCustomerById, 
    updateCustomerById, 
    deleteCustomerById 
}