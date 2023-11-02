import React from 'react'
import PDFInput from '../components/PDFInput'
import Layout from '../components/Layout'
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

  <Layout>
    <PDFInput />
  </Layout>
//   </ThemeProvider>
 )
}

export default Home
