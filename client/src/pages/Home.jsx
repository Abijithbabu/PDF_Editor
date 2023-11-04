import React from 'react'
import PDFInput from '../components/PDFInput'
import Recent from '../components/Recent'
import { ThemeProvider, createTheme } from '@mui/material';

const Home = () => {
    const theme = createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#afaeb2",
          },
          secondary: {
            main: "#213547",
          },
        },
      });
 return (
    // <ThemeProvider theme={theme}>

  <>
    <PDFInput />
    <Recent/>
  </>
//   </ThemeProvider>
 )
}

export default Home
