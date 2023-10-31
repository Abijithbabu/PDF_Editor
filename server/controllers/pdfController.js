const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
module.exports.createPdf = async (req, res, next) => {
  try {
    const { filename, pages} = req?.body
    const uploadedFile = req.files.file;
    const filePath = `${path.dirname(__dirname)}\\public\\pdfs\\${filename}`;

    // Save the uploaded file to the public folder
    await uploadedFile.mv(filePath)

    // Load the PDF from the temporary file
    const content = await PDFDocument.load(fs.readFileSync(filePath));
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

    return res.json({ status: true, message:'done', link:`${process.env.SERVER_URL}/pdfs/${filename}` });

  } catch (ex) {
    return res.json({ status: false, message:ex.message }); 

    next(ex);
  }
};