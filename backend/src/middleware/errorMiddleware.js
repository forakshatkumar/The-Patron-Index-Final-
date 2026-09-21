const errorMiddleware = (err, req, res, next) => {
    console.error("Error:", err.message);

    // Multer file size error
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            message: "File size cannot exceed 10 MB"
        });
    }

    // File validation error
    if (err.message === "This file type is not allowed") {
        return res.status(400).json({
            message: err.message
        });
    }

    // Other errors
    res.status(500).json({
        message: "Something went wrong",
        error: err.message
    });
};

module.exports = errorMiddleware;