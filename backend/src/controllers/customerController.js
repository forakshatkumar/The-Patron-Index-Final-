const Customer = require("../models/Customer");
const CustomerFeature = require("../models/CustomerFeature");
const CustomerPrediction = require("../models/CustomerPrediction");
const createAuditLog = require("../utils/auditLogger");
// Create a customer
const createCustomer = async (req, res, next) => {
    try {
        const {
            customerId,
            name,
            email,
            totalSpent,
            totalOrders
        } = req.body;

        if (!customerId || !name || !email) {
            return res.status(400).json({
                message: "customerId, name and email are required"
            });
        }

        const existingCustomer = await Customer.findOne({
            customerId
        });

        if (existingCustomer) {
            return res.status(409).json({
                message: "Customer already exists"
            });
        }

        const customer = await Customer.create({
            customerId,
            name,
            email,
            totalSpent: totalSpent || 0,
            totalOrders: totalOrders || 0
        });
        await createAuditLog({
    userId: req.user.userId,
    action: "CUSTOMER_CREATED",
    resource: "Customer",
    resourceId: customer._id.toString(),
    details: `Customer ${customerId} was created`,
    ipAddress: req.ip
});

        res.status(201).json({
            message: "Customer created successfully",
            customer
        });

    } catch (error) {
        next(error);
    }
};


// Get all customers
const getCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find();

        res.json({
            count: customers.length,
            customers
        });

    } catch (error) {
        next(error);
    }
};


// Get one customer with features and prediction
const getCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({
            customerId: req.params.id
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const features = await CustomerFeature.findOne({
            customer: customer._id
        });

        const prediction = await CustomerPrediction.findOne({
            customer: customer._id
        });

        res.json({
            customer,
            features,
            prediction
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createCustomer,
    getCustomers,
    getCustomer
};