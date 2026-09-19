const ScanRecord = require("../models/ScanRecord");
const crypto = require("crypto");
const fs = require("fs");

// Create a new scan record
const createScan = async (req, res) => {
    try {
        const { fileName, fileType, fileSize } = req.body;

        if (!fileName || !fileType || !fileSize) {
            return res.status(400).json({
                message: "File details are required"
            });
        }

        const scanId = crypto.randomUUID();

        const scan = await ScanRecord.create({
            scanId,
            fileName,
            fileType,
            fileSize,
            status: "pending",
            uploadedBy: req.user.userId
        });

        res.status(201).json({
            message: "Scan created successfully",
            scan
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create scan",
            error: error.message
        });
    }
};
// Get scan by scanId
const getScan = async (req, res) => {
    try {
        const { id } = req.params;

        const scan = await ScanRecord.findOne({ scanId: id });

        if (!scan) {
            return res.status(404).json({
                message: "Scan not found"
            });
        }

        res.json({
            scan
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get scan",
            error: error.message
        });
    }
};
// Upload and create scan
const uploadScan = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "File is required"
            });
        }

        const scanId = crypto.randomUUID();

        const scan = await ScanRecord.create({
            scanId,
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
            status: "pending",
            uploadedBy: req.user.userId
        });

        res.status(201).json({
            message: "File uploaded successfully",
            scanId: scan.scanId,
            status: scan.status,
            fileName: scan.fileName
        });

    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, () => {});
        }

        res.status(500).json({
            message: "File upload failed",
            error: error.message
        });
    }
};

module.exports = {
    createScan,
    getScan,
    uploadScan
};