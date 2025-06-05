const express = require("express");
const userRoutes = require("./routes/userRotes");
const providerRoutes = require("./routes/providerRoutes");
const adminRouter = require("./routes/adminRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/admin", adminRouter);

module.exports = app;
