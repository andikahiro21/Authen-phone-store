const express = require("express");
const { authenticateUser } = require("../middleware/authenticateUser");
const { authenticateAdmin } = require("../middleware/authenticateAdmin");
const { getPhone, getPhoneID, getPhoneBrand, createPhone, editPhone, deletePhone } = require("../controllers/phoneController");
const upload = require("../helpers/storage");
const router = express.Router();

router.use(authenticateUser);
router.get("/", getPhone);
router.get("/:id", getPhoneID);
router.get("/brand/:id", getPhoneBrand);

router.use(authenticateAdmin);
router.post("/create", upload.single("image"), createPhone);
router.put("/:id", upload.single("image"), editPhone);
router.delete("/:id", deletePhone);

module.exports = router;
