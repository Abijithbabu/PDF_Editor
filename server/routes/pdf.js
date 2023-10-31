const { createPdf } = require("../controllers/pdfController");
const router = require("express").Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload())
router.post("/createPdf", createPdf);

module.exports = router;
