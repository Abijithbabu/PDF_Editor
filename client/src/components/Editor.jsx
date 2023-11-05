import { Backdrop, Box, CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Workspace from './Workspace';
import { useSelector } from 'react-redux';
import Info from './Info';
import { Document, Page } from 'react-pdf';


export default function Editor() {
  const uploadedFile = useSelector(store => store.selectedPDF)
  const [pages, setPages] = useState(null);
  const [selected, setSelected] = useState(1)
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('sm'));
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
    <>
      {uploadedFile ?
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!pages}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid container spacing={2} >
            <Grid item xs={12} md={5} order={{ xs: 1, md: 1 }}>
              {pages && <Workspace file={uploadedFile} selected={selected} handleSelection={setSelected} Pages={pages} />}
            </Grid>
            <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
              <Box sx={{
                borderRadius: '7px',
                backgroundColor: '#1C1C24',
                overflow: 'hidden'
              }}>
                <Document file={uploadedFile} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={selected} width={md ? 399 : 319} />
                </Document>
              </Box>
            </Grid>
          </Grid>
        </> :
        <Info
          title='Oops, Nothing Here !'
          body='Insert a new file or choose from existing files to start Editor'
          text='choose file'
        />
      }
    </>
  );
}
