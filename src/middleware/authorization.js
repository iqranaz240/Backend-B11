const jwt = require('jsonwebtoken');
const Customer = require("../models/customer");

const jwtSecret = 'mySecret';

const checkAdmin = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    try {
        const decoded = jwt.verify(token, jwtSecret);
        console.log('decoded token ....... ', decoded)
        const role = decoded.role;
        if(role !== 'admin') {
            return res.status(403).send({ auth: false, message: 'Unauthorized.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const checkValidUser = async (req, res, next) => {
    const token = req.headers['token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const customer = await Customer.findOne({email: decoded.email});
        if(req.query.customerId !== customer.customerId) {
            return res.status(403).send({ auth: false, message: 'Unauthorized.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {checkAdmin, checkValidUser}