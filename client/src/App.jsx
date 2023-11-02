import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { pdfjs } from 'react-pdf';
import './App.css'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ThemeProvider, createTheme } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function App() {
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
    <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>  
    </>
  );
}

export default App;

