const express = require("express");
const userRoute = require("./userRoute");
const adminRoute = require("./adminRoute");
const brandRoute = require("./brandRoute");
const phoneRoute = require("./phoneRoute");
const transactionRoute = require("./transactionRoute");

// const genreRoute = require("./genreRoute");
// const bookRoute = require("./bookRoute");

// const taskRoute = require("./taskRoute");
const router = express.Router();

router.use("/", userRoute);
router.use("/admin", adminRoute);
router.use("/brand", brandRoute);
router.use("/phone", phoneRoute);
router.use("/transaction", transactionRoute);

module.exports = router;
