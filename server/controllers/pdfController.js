const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
module.exports.createPdf = async (req, res, next) => {
  try {
    // Load pdfs 
    const content = await PDFDocument.load(fs.readFileSync(`${__dirname}/sample.pdf`));

    // Create a new document
    const doc = await PDFDocument.create();

    // Add individual content pages
    const contentPages = await doc.copyPages(content, [3, 0, 2]);
    for (const page of contentPages) {
      doc.addPage(page);
    }

    // Write the PDF to a file
    fs.writeFileSync(`${path.dirname(__dirname)}\\public\\pdfs\\test.pdf`, await doc.save());

    return res.json({ status: true });
    
  } catch (ex) {
    next(ex);
  }
};