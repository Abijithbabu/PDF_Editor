import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Backdrop, ButtonGroup, CircularProgress, IconButton, InputAdornment, Link, Stack, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Home from '@mui/icons-material/Home';
import Cancel from '@mui/icons-material/Cancel';
import Error from '@mui/icons-material/Error';
import CreateNewFolder from '@mui/icons-material/CreateNewFolder';
import FileDownload from '@mui/icons-material/FileDownload';
import { status } from '../utils/constants';

const PdfExtractionComponent = ({ file, pages }) => {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState(null)
  const [filename, setFilename] = useState('')
  const [progress, setProgress] = React.useState(0);

  const extractPagesAndDownload = async () => {
    counter()
    const order = pages.map(x => Number(x.key))
    const formData = new FormData()
    formData.append('file', file)
    formData.append('filename', filename)
    formData.append('pages', JSON.stringify(order))
    const res = await axios.post('http://localhost:5000/api/pdf/createPdf', formData)
    console.log(res.data)
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
      <button onClick={() => setOpen(true)} style={{width:'150px'}}>
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
            <DialogContentText flexDirection={'row'}>
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
                    <CheckCircleIcon color='success' />
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
                      <Button variant='outlined' >
                        <a href={'maku2.pdf'} download target="_blank">
                          <FileDownload />&nbsp;&nbsp;Download
                        </a>
                      </Button>}
                    <Link fontSize={'small'} onClick={extractPagesAndDownload}>regenerate</Link>
                  </>
                  :
                  <Button variant='outlined' disabled={!!progress} onClick={extractPagesAndDownload}>
                    <CreateNewFolder />&nbsp;&nbsp;create pdf
                  </Button>
                }
              </Stack>
            </DialogContentText>
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
