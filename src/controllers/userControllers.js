const Customer = require("../models/customer");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = 'mySecret';

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

const signupCustomer = async (req, res) => {
    const customerData = req.body;

    try {
        // Hash the password before saving
        const saltRounds = 15;
        customerData.password = await bcrypt.hash(customerData.password, saltRounds);
        console.log(customerData.password)
        const customer = new Customer(customerData);
        await customer.save();
        console.log('Customer created:', customer);

        res.status(200).json({ message: 'Customer created', customer });
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ message: 'Some error occurred', error: error.message });
    }
};

const loginCustomer = async (req, res) => {
    const { email, password } = req.body;
    let token = null;

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        // Compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        token = await jwt.sign({ email: customer.email, role: 'customer' }, jwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });

        console.log(token)
        res.status(200).json({ token: token, email: customer.email, customerId: customer.customerId, msg: 'successfully logged in.' });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
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

const deleteCustomerById = async(req, res) => {
    const customerId = req.query.customerId;
    try {
        const customer = await Customer.deleteOne({customerId});
        if (customer) {
            res.status(200).json({customer})
        } else {
            res.status(404).json({message: 'Customer not found.'})
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({message: 'Error deleting customer', error: error})
    }
}

module.exports = { 
    getAllUsers, 
    getUserByUserId, 
    createCustomer, 
    getAllCustomers, 
    getCustomerById, 
    updateCustomerById, 
    deleteCustomerById,
    signupCustomer,
    loginCustomer
}