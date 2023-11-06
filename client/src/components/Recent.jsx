import * as React from 'react';
import { Paper, Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Toolbar, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Info from './Info';
import { fetchLastUpdated } from '../utils/api';
import { timeAgo } from '../utils/functions';
import { useNavigate } from 'react-router-dom';

export default function BasicTable() {
  const auth = useSelector(store => store?.user)
  const [data, setData] = React.useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  React.useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res = await fetchLastUpdated(auth._id)
    setData(res?.data?.data)
    dispatch({ type: 'dispatch_data', payload: import.meta.env.VITE_SERVER_URL+res?.data?.data?.[0]?.path })
  }
  const editFile = (file) => {
    dispatch({ type: 'dispatch_data', payload: import.meta.env.VITE_SERVER_URL+file })
    navigate('/editor')
  }
  const theme = useTheme()
  const color = theme.palette.primary.main
  return (
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
          color={color}
        >
          Recent Files
        </Typography>
      </Toolbar>
      {auth ? data && data?.length ?
        <TableContainer component={Paper} >
          <Table aria-label="simple table" >
            <TableHead>
              <TableRow >
                <TableCell sx={{color}}>Filename</TableCell>
                <TableCell sx={{color}} align="center" >Last updated</TableCell>
                <TableCell sx={{color}} align="center">size on disk</TableCell>
                <TableCell sx={{color}} align="center">created on</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                  onClick={() => editFile(row.path)}
                >
                  <TableCell sx={{color}} component="th" scope="row">
                    {row.filename}
                  </TableCell>
                  <TableCell sx={{color}} align="center">{timeAgo(row.updatedAt)}</TableCell>
                  <TableCell sx={{color}} align="center">{`${(row.size / 1024).toFixed(2)} KB`}</TableCell>
                  <TableCell sx={{color}} align="center">{new Date(row.createdAt).toDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> :
        <Info />
        :
        <Info
          title='Want to see your history ?'
          body='Login to your account to view complete history'
          url='/login'
        />
      }
    </>
  );
}
