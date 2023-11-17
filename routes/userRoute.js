const express = require("express");
const router = express.Router();
const { login, register, forgotPassword, resetPassword } = require("../controllers/userController");
const upload = require("../helpers/storage");

router.post("/login", upload.array(), login);
router.post("/register", upload.array(), register);
router.post("/forgot-password", upload.array(), forgotPassword);
router.put("/reset-password/:token", upload.array(), resetPassword);

module.exports = router;
