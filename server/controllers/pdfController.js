const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
module.exports.createPdf = async (req, res, next) => {
  try {
    const { filename, pages, file } = req?.body
    const uploadedFile = req?.files?.file;
    let existingFile
    const filePath = `${path.dirname(__dirname)}\\public\\pdfs\\${filename}`;
    if (uploadedFile) {

      // Save the uploaded file to the public folder
      await uploadedFile.mv(filePath)
      existingFile = filePath
    } else {
      const url = new URL(file);
      const name = url.pathname.split('/').pop()
      existingFile = `${path.dirname(__dirname)}\\public\\pdfs\\${name}`
    }

    // Load the PDF from the temporary file
    const content = await PDFDocument.load(fs.readFileSync(existingFile));
    // Create a new document
    const doc = await PDFDocument.create();

    // Add individual content pages
    const contentPages = await doc.copyPages(content, JSON.parse(pages));
    for (const page of contentPages) {
      doc.addPage(page);
    }

    // await fs.unlink(tempFilePath); 
    // Write the PDF to a file
    fs.writeFileSync(filePath, await doc.save());

    return res.json({ status: true, message: 'done', link: `${process.env.SERVER_URL}/pdfs/${filename}`, file: await doc.save() });

  } catch (ex) {
    return res.json({ status: false, message: ex.message });

    next(ex);
  }
};