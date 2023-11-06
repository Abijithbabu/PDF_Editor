const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const Files = require('../models/fileModel')
const Users = require('../models/userModel')

module.exports.createPdf = async (req, res, next) => {
  try {
    const { filename, pages, file, userId } = req?.body
    const uploadedFile = req?.files?.file;
    let existingFile
    const filePath = `${path.dirname(__dirname)}\\public\\pdfs\\${filename}`;
    const dirname = path.dirname(filePath);

    // create a new folder for user if he doesn't have an existing
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }

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

    // Assume the size of pdf 
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
      } else {
        saveFiles(stats.size);
      }
    });
    let existingFiles
    // save to database if document already existed else created a new collection 
    const saveFiles = async (size) => {
      existingFiles = await Files.findOne({ author: userId, filename })
      if (existingFiles) {
        existingFiles.size = size
        await existingFiles.save()
      } else {
        existingFiles = await Files.create({
          filename,
          path: `/pdfs/${filename}`,
          author: userId,
          size
        })
      }
    }

    return res.status(200).json({ status: true, message: 'done', link: `/pdfs/${filename}` });

  } catch (ex) {
    return res.status(400).json({ status: false, message: ex.message });
  }
};

module.exports.fetchPdf = async (req, res) => {
  try {
    const data = await Files.find({ author: req.query.id })
    if (data)
      return res.status(200).json({ status: true, data });

  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
}

module.exports.fetchLastUpdated = async (req, res) => {
  try {
    const data = await Files.find({ author: req.query.id }).sort({updatedAt:-1}).limit(5)
    if (data)
      return res.status(200).json({ status: true, data });

  } catch (err) {
    return res.status(200).json({ status: false, message: err.message });
  }
}