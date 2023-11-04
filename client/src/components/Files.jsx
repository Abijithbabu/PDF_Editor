import * as React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Info from './Info';

export default function Files() {
    const [data, setData] = React.useState([])
  return (
    <>
   { data && data?.length ? 
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

    </> :
    <>
    <Info/>
    </>
    }
    </>
  );
}
