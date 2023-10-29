import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PDFPreview from './PdfPreview';
import { Grid } from '@mui/material'
function PDFViewer() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [numPages, setNumPages] = useState(1);
  const [selected, setSelected] = useState(1)
  const handleFileChange = (file) => {
    setUploadedFile(file);
    // pdfjs.getDocument(file).promise.then((pdf) => {
    //   console.log(pdf.numPages)
    //   setNumPages(pdf.numPages);
    // });
  };
  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(numPages);
    setNumPages(numPages);
  }
  return (
    <div className="app">
      <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e.target.files[0])} />
      <Grid container spacing={3}>
        <Grid item>
          {uploadedFile && (
            <Document file={uploadedFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page size="A4" pageNumber={selected} />
            </Document>
          )}

        </Grid>
        <Grid item>
          {uploadedFile && <PDFPreview file={uploadedFile} selected={selected} handleSelection={setSelected} numPages={numPages} />}
        </Grid>
      </Grid>
    </div>
  );
}

export default PDFViewer;