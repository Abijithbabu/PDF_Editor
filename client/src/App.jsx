import { HashRouter } from "react-router-dom";
import Router from "./routes/Router";
import { pdfjs } from 'react-pdf';
import './App.css'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Layout from './components/Layout'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#C5C2C2",
        // main: "#afaeb2",
      },
      secondary: {
        main: "#213547",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <ReactNotifications />
        <HashRouter>
          <Layout>
            <Router />
          </Layout>
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

