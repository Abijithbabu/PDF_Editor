const { createPdf, fetchPdf, fetchLastUpdated } = require("../controllers/pdfController");
const router = require("express").Router();
const fileUpload = require('express-fileupload');
const { verifyToken } = require("../middlewares/authMiddleware");

router.use(fileUpload())
router.post("/createPdf", createPdf);
router.get("/fetchPdf", fetchPdf);
router.get("/fetchLastUpdated", fetchLastUpdated);

module.exports = router;
