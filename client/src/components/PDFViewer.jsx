import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PDFPreview from './PdfPreview';
import { Grid } from '@mui/material'

function PDFViewer() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pages, setPages] = useState(null);
  const [selected, setSelected] = useState(1)
  const handleFileChange = (file) => {
    setUploadedFile(file);
  };
  const generatePages = (numPages) => {
    return Array.from({ length: numPages }, (_, index) => (
      <Document file={uploadedFile} key={index}>
        <Page pageNumber={index + 1} width={100} />
      </Document>
    ))
  }
  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(numPages);
    setPages(generatePages(numPages));
  }
  return (
    <div className="app">
      {!uploadedFile && <input type="file" accept=".pdf" style={{ cursor: 'pointer', zIndex: 100, padding: 50 }} onChange={(e) => handleFileChange(e.target.files[0])}/>}
      <Grid container spacing={2} padding={6}> 
        <Grid item lg={6}>
          {pages && <PDFPreview file={uploadedFile} selected={selected} handleSelection={setSelected} Pages={pages} />}
        </Grid>
        <Grid item lg={6}>
          {uploadedFile && (
            <Document file={uploadedFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={selected} />
            </Document>
          )}

        </Grid>
      </Grid>
    </div>
  );
}

export default PDFViewer;