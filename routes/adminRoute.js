const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/userController");
const { getBrand } = require("../controllers/brandController");
const { authenticateAdmin } = require("../middleware/authenticateAdmin");

router.use(authenticateAdmin);
// router.get("/brand", getBrand);
module.exports = router;
