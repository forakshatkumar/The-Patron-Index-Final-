const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createCustomer,
    getCustomers,
    getCustomer
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", authMiddleware, createCustomer);

router.get("/", authMiddleware, getCustomers);

router.get("/:id", authMiddleware, getCustomer);

module.exports = router;