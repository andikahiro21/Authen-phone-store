const express = require("express");
const { getBrand, getBrandID, createBrand, editBrand, deleteBrand } = require("../controllers/brandController");
const { authenticateUser } = require("../middleware/authenticateUser");
const { authenticateAdmin } = require("../middleware/authenticateAdmin");
const upload = require("../helpers/storage");
const router = express.Router();

router.use(authenticateUser);
router.get("/", getBrand);
router.get("/:id", getBrandID);
router.use(authenticateAdmin);
router.post("/create", upload.array(), createBrand);
router.put("/:id", upload.array(), editBrand);
router.delete("/:id", upload.array(), deleteBrand);

module.exports = router;
