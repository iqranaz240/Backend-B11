const Customer = require("../models/customer");
const mongoose = require("mongoose")

const getAllUsers = (req, res) => {
    res.send('My all users');
}

const getUserByUserId = (req, res) => {
    res.send('Get user with given user ID')
}

const createCustomer = async (req, res) => {
    const customerData = {
        customerId: '4',
        name: 'Customer 4',
        contact: 123456,
        email: 'customer4@yopmail.com',
        address: 'Karachi'
    };
    
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


module.exports = { getAllUsers, getUserByUserId, createCustomer }