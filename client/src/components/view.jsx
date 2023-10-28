import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
const PDFViewer = () => {
 const pdfURL = 'https://www.africau.edu/images/default/sample.pdf';
 const [uploadedFile, setUploadedFile] = useState(null);
 const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };
return (
 <div>
    <input type="file" accept=".pdf" onChange={handleFileChange} />
    {uploadedFile && (
  <div >
    <Document file={uploadedFile} width={85} height={110}> 
      <Page pageNumber={2} width={850} height={1100}/>
    </Document>
  </div>
)}
 </div>
 );
};
export default PDFViewer;