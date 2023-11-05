const { createPdf, fetchPdf, fetchLastUpdated } = require("../controllers/pdfController");
const router = require("express").Router();
const fileUpload = require('express-fileupload');
const { verifyToken } = require("../middlewares/authMiddleware");

router.use(fileUpload())
router.post("/createPdf", verifyToken, createPdf);
router.get("/fetchPdf", verifyToken, fetchPdf);
router.get("/fetchLastUpdated", verifyToken, fetchLastUpdated);

module.exports = router;
