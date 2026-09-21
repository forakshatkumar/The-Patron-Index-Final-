const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/quarantine");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }
});

// Allowed file extensions
const allowedExtensions = [
    ".txt",
    ".pdf",
    ".doc",
    ".docx",
    ".zip",
    ".exe",
    ".dll"
];

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
        return cb(
            new Error("This file type is not allowed")
        );
    }

    cb(null, true);
};

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: fileFilter
});

module.exports = upload;