const { createPdf, fetchPdf } = require("../controllers/pdfController");
const router = require("express").Router();
const fileUpload = require('express-fileupload');

router.use(fileUpload())
router.post("/createPdf", createPdf);
router.get("/fetchPdf", fetchPdf);

module.exports = router;
