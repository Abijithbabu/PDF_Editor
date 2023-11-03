import { NavigateNext } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Info = (props) => {
const {
    title = 'Oops, Nothing Here !',
    body = 'Insert a new file or choose from existing files to start Editor',
    text = 'choose file',
    url = '/'
} = props
return (
  <Stack alignItems={'center'} mt={7}>
     <Typography variant="subtitle2">
         {title}
     </Typography>
     <Typography variant='caption'>
         {body}
     </Typography>
     <Link to={url} >
         <Box
             sx={{
                 display: 'flex',
                 color: 'rgb(58, 144, 190)',
                 alignItems: 'center', pl: 1, pb: 1
             }}
         >
             <Typography variant='caption'>
                 {text}
             </Typography>
             <NavigateNext />
         </Box>
     </Link>
  </Stack>
)
}

export default Info
