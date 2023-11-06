import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, IconButton, Link, Stack, TextField, ThemeProvider, Typography, createTheme, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import { CheckCircle, Cancel, Error, CreateNewFolder, FileDownload } from '@mui/icons-material';
import { status } from '../utils/constants';
import { EditPDF } from '../utils/api';
import { useSelector } from 'react-redux';
import { validateName } from '../utils/functions';

const PdfExtractionComponent = ({ file, pages }) => {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState(null)
  const [error, setError] = useState({status:false,message:'filename extension (.pdf) is required'})
  const [filename, setFilename] = useState('')
  const [progress, setProgress] = React.useState(0);
  const user = useSelector(store=>store?.user)
  const extractPagesAndDownload = async () => {
    if(!error.status){
      counter()
     const order = pages.map(x => Number(x.key))
     const res = await EditPDF({ file, filename, order, id:user._id })
     setData(res.data)
  }
  }
useEffect(() => {
setError(validateName(filename))
}, [filename])

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
      <Box style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 10 }}>
        <Button variant='contained' onClick={() => setOpen(true)}>Export</Button>
      </Box>
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
              error={error.status}
              onChange={e => setFilename(e.target.value)}
              fullWidth
              sx={{ minWidth: '35vw', pb: '10px' }}
              helperText={error.message}
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
                    <Button variant='outlined' component={Link} href={import.meta.env.VITE_SERVER_URL+data.link} target="_blank">
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
            <IconButton onClick={() => setProgress(0)}>
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
