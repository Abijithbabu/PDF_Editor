import React, { useState } from 'react';
import axios from 'axios'
import { Backdrop, CircularProgress, IconButton, Link, Stack, TextField, ThemeProvider, Typography, createTheme, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CheckCircle, Home, Cancel, Error, CreateNewFolder, FileDownload } from '@mui/icons-material';
import { status } from '../utils/constants';
import { EditPDF } from '../utils/api';

const PdfExtractionComponent = ({ file, pages }) => {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState(null)
  const [filename, setFilename] = useState('')
  const [progress, setProgress] = React.useState(0);

  const extractPagesAndDownload = async () => {
    counter()
    const order = pages.map(x => Number(x.key))
    const res = await EditPDF({ file, filename, order })
    setData(res.data)
  }

  const counter = () => {
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        } else {
          return prevProgress += 10;
        }
      })
    }, 200);
  }

  const defaultTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div>
      <button onClick={() => setOpen(true)} style={{ width: '150px' }}>
        Extract and Download PDF
      </button>
      <ThemeProvider theme={defaultTheme}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <DialogTitle >
            Generate PDF
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              id="standard-basic"
              label="Filename"
              value={filename}
              onChange={e => setFilename(e.target.value)}
              fullWidth
              sx={{ minWidth: '35vw', pb: '10px' }}
              helperText="extension (.pdf) is not required"
            />
            {!!progress &&
              <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" alignItems={'center'}>
                {progress == 100 && data ? data?.status ?
                  <CheckCircle color='success' />
                  :
                  <Error color='error' />
                  :
                  <CircularProgress color={status[progress]?.color} />
                }
                <Typography fontSize={'small'}>
                  {progress === 100 && data ? data.message : status[progress]?.title}
                </Typography>
              </Stack>}
            <Stack pt={3}>
              {progress == 100 && data ?
                <>
                  {data?.link &&
                    <Button variant='outlined' component={Link} href={data.link} target="_blank">
                      <FileDownload />&nbsp;&nbsp;Download
                    </Button>
                  }
                  <Link fontSize={'small'} onClick={extractPagesAndDownload}>regenerate</Link>
                </>
                :
                <Button variant='outlined' disabled={!!progress} onClick={extractPagesAndDownload}>
                  <CreateNewFolder />&nbsp;&nbsp;create pdf
                </Button>
              }
            </Stack>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={() => setOpen(false)} >
              <Home />
              <Typography fontSize={'small'}>Home</Typography>
            </IconButton>
            <IconButton onClick={() => setOpen(false)}>
              <Cancel />
              <Typography fontSize={'small'}>Cancel</Typography>
            </IconButton>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default PdfExtractionComponent;
