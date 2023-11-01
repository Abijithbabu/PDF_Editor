import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import PDFPreview from './PDFPreview.jsx';
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
    setPages(generatePages(numPages));
  }
  return (
    <div className="app">
      {!uploadedFile &&
        <input type="file" accept=".pdf"
          style={{ cursor: 'pointer', zIndex: 100, padding: 50 }}
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
      }
      <Grid container spacing={1} >
        <Grid item lg={6.2} >
          {pages && <PDFPreview file={uploadedFile} selected={selected} handleSelection={setSelected} Pages={pages} />}
        </Grid>
        <Grid item lg={5.8} sx={{
          overflowX: 'hidden',
          overflowY: 'auto',
          whiteSpace: 'wrap',
          maxHeight: '96vh',
          mt: '20px',
        }}>
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