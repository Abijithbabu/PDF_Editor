import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import PDFPreview from './PDFPreview.jsx';
import { Backdrop, CircularProgress, Grid } from '@mui/material'
import { useSelector } from 'react-redux';
import Info from './Info.jsx';

function PDFViewer() {
  const uploadedFile = useSelector(store => store.selectedPDF)
  const [pages, setPages] = useState(null);
  const [selected, setSelected] = useState(1)

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
    <div>
      {uploadedFile ?
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!pages}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
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
              backgroundColor: 'white'
            }}>
              <Document file={uploadedFile} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={selected} />
              </Document>
            </Grid>
          </Grid>
        </> :
        <Info
          title='Oops, Nothing Here !'
          body='Insert a new file or choose from existing files to start Editor'
          text='choose file'
        />
      }
    </div>
  );
}

export default PDFViewer;