const ScanRecord = require("../models/ScanRecord");
const Customer = require("../models/Customer");

const getDashboardSummary = async (req, res, next) => {
    try {
        const totalScans = await ScanRecord.countDocuments();

        const completedScans = await ScanRecord.countDocuments({
            status: "completed"
        });

        const pendingScans = await ScanRecord.countDocuments({
            status: "pending"
        });

        const failedScans = await ScanRecord.countDocuments({
            status: "failed"
        });

        const totalCustomers = await Customer.countDocuments();

        const riskData = await ScanRecord.aggregate([
            {
                $match: {
                    riskScore: { $ne: null }
                }
            },
            {
                $group: {
                    _id: null,
                    averageRiskScore: {
                        $avg: "$riskScore"
                    }
                }
            }
        ]);

        const averageRiskScore =
            riskData.length > 0
                ? Number(riskData[0].averageRiskScore.toFixed(2))
                : 0;

        res.json({
            totalScans,
            completedScans,
            pendingScans,
            failedScans,
            totalCustomers,
            averageRiskScore
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardSummary
};