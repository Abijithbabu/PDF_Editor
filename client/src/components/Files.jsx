import * as React from 'react';
import { Grid, Link, Menu, MenuItem, Popper, Stack, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Info from './Info';
import { fetchPDF } from '../utils/api';
import pdfImage from '../assets/pdf.png'
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import FileOpenIcon from '@mui/icons-material/FileOpen';

export default function Files() {
  const [data, setData] = React.useState([])
  const [selected, setSelected] = React.useState([])
  const auth = useSelector(store => store?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, path) => {
    setSelected(path)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await fetchPDF(auth._id)
    setData(res?.data?.data)
  }

  const editFile = () => {
    dispatch({ type: 'dispatch_data', payload: selected })
    navigate('/editor')
  }
  return (
    <>
      {data && data?.length ?
        <>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Saved Files
            </Typography>

          </Toolbar>
          <Grid container>
            {data.map((x) => (
              <Grid item key={x._id}>
                <Stack alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={(e) => handleClick(e, x.path)}>
                  <img src={pdfImage} height={150} />
                  <Typography variant='subtitle2' pt={1}>
                    {x.filename}
                  </Typography>
                  <Typography variant='caption' >
                    {(x.size / 1024).toFixed(2)} KB
                  </Typography>
                </Stack>
              </Grid>
            ))}

          </Grid>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={editFile} >
              <Edit fontSize='small' />
              <Typography paddingLeft={1}> Edit</Typography></MenuItem>
            <Link href={selected} target='_blank' color="inherit" sx={{ textDecorationLine: "none" }}>
              <MenuItem component={Link}>
                {console.log(selected)}
                <FileOpenIcon fontSize='small' /> <Typography paddingLeft={1}>open</Typography>
              </MenuItem>
            </Link>
          </Menu>
        </> :
        <>
          <Info />
        </>
      }
    </>
  );
}
