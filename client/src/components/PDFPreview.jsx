import React from 'react';
import { Document, Page } from 'react-pdf';

function PDFPreview({ file, numPages, handleSelection, selected }) {
  return (
    <div className="pdf-preview">
      {Array.from({ length: numPages }, (_, index) => (
        <div key={index} className={index+1===selected ? "pdf-preview-selected":'pdf-preview-page'} onClick={()=>handleSelection(index+1)}>
          <Document file={file}>
            <Page pageNumber={index + 1} width={100} />
          </Document>
        </div>
      ))}
    </div>
  );
}

export default PDFPreview;