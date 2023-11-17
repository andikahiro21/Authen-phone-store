const express = require("express");
const { authenticateUser } = require("../middleware/authenticateUser");
const { authenticateAdmin } = require("../middleware/authenticateAdmin");
const upload = require("../helpers/storage");
const { getTransaction, createTransaction } = require("../controllers/transactionController");
const router = express.Router();

router.use(authenticateUser);
router.get("/", getTransaction);
router.use(authenticateAdmin);
router.post("/create", upload.array(), createTransaction);
// router.put("/:id", upload.array(), editBrand);
// router.delete("/:id", upload.array(), deleteBrand);

module.exports = router;
