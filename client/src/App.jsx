import './App.css'
import PDFViewer from './components/PDFViewer'
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
function App() {

  return (
    <>
      <PDFViewer />
    </>
  )
}

export default App
