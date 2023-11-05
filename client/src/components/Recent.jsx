import * as React from 'react';
import { Paper, Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Info from './Info';
import { fetchPDF } from '../utils/api';
import { timeAgo } from '../utils/functions';
import { useNavigate } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('sample.pdf', 159, 6.0, 24, 4.0),
  createData('naseef.pdf', 237, 9.0, 37, 4.3),
  createData('resume.pdf', 262, 16.0, 24, 6.0),
  createData('hi.pdf', 305, 3.7, 67, 4.3),
];

export default function BasicTable() {
  const auth = useSelector(store => store?.user)
  const [data, setData] = React.useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  React.useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res = await fetchPDF(auth._id)
    console.log(res)
    setData(res?.data?.data)
  }
  const editFile = (file) => {
    dispatch({ type: 'dispatch_data', payload: file })
    navigate('/editor')
  }
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
        >
          Recent Files
        </Typography>
      </Toolbar>
      {auth ? data && data?.length ?
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Filename</TableCell>
                <TableCell align="center">Last updated</TableCell>
                <TableCell align="center">size on disk</TableCell>
                <TableCell align="center">created on</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                  onClick={() => editFile(row.path)}
                >
                  <TableCell component="th" scope="row">
                    {row.filename}
                  </TableCell>
                  <TableCell align="center">{timeAgo(row.updatedAt)}</TableCell>
                  <TableCell align="center">{`${(row.size / 1024).toFixed(2)} KB`}</TableCell>
                  <TableCell align="center">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
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
