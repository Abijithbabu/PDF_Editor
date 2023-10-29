import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

function PDFPreview({ file, Pages, handleSelection, selected }) {
  const [pages, setPages] = useState(Pages)
  const generatePages = () => {
    return Array.from({ length: numPages }, (_, index) => (
      <div key={index}
        onDragStart={(e) => onDragStart(e, 't.name', index)}
        onDrop={(e) => onDrop(e, "wip", index)}
        draggable
        className="draggable"
      // style={{ backgroundColor: t.bgcolor }}     
      >
        <div key={index} className={index + 1 === selected ? "pdf-preview-selected" : 'pdf-preview-page'} onClick={() => handleSelection(index + 1)}>
          <Document file={file}>
            <Page pageNumber={index + 1} width={100} />
          </Document>
        </div>
      </div>
    ))
  }

  const onDragStart = (ev, id, index) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("index", index);
  }

  const onDragOver = (ev) => {
    ev.preventDefault();
  }

  const onDrop = (ev, cat, index) => {
    console.log(index, 'this in')
    let id = ev.dataTransfer.getData("id");
    let ind = ev.dataTransfer.getData("index");
    const index2 = parseInt(ind)
    console.log(id, index2)
    const arr = pages;

    console.log(pages);
    console.log(arr);
    [arr[index], arr[index2]] = [arr[index2], arr[index]];
    console.log(arr);

    setPages([...arr])
  }
  useEffect(() => {
    //  setPages(generatePages()) 
  }, [])

  useEffect(() => {
    console.log('pages', pages)
  }, [pages])

  return (
    <Grid container spacing={5} className="pdf-preview" onDragOver={(e) => onDragOver(e)}>
      {pages.map((page, index) => (
        <Grid item key={index}
          onDragStart={(e) => onDragStart(e, 't.name', index)}
          onDrop={(e) => onDrop(e, "wip", index)}
          onClick={() => handleSelection(Number(page.key) + 1)}
          draggable
          className="draggable"
        >
          <div className={parseInt(page.key) + 1 == selected ? "pdf-preview-selected" : 'pdf-preview-page'} >
            {page}
          </div>
        </Grid>
      ))
      }
    </Grid>
  );
}

export default PDFPreview; 