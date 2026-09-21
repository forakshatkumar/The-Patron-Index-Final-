const mongoose = require("mongoose");

const customerPredictionSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
            unique: true
        },

        segment: {
            type: String,
            default: null
        },

        atRiskProbability: {
            type: Number,
            default: null
        },

        recommendation: {
            type: String,
            default: ""
        },

        modelVersion: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "CustomerPrediction",
    customerPredictionSchema
);