import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import View from './components/view'
import { pdfjs } from 'react-pdf';

// Set the workerSrc to a CDN URL
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function App() {

  return (
    <>
<View/>
    </>
  )
}

export default App
