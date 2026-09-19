const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "backend"
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});