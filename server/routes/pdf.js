const { createPdf } = require("../controllers/pdfController");
const router = require("express").Router();

router.post("/createPdf", createPdf);

module.exports = router;
