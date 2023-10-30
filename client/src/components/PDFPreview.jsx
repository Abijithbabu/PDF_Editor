import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import Download from './Download'

function PDFPreview({ file, Pages, handleSelection, selected }) {
  const [pages, setPages] = useState(Pages)
  const [rePages, setRePages] = useState(Pages)

  const onDragStart = (ev, id, index) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("index", index);
  }

  const onDragOver = (ev) => {
    ev.preventDefault();
  }

  const onDrop = (ev, type, index) => {
    console.log(index, 'this in',type)
    const id = ev.dataTransfer.getData("id");
    const index2 = parseInt(ev.dataTransfer.getData("index"));
    if(type===id){
  if(type==='workspace'){
    setPages(reArrange(pages,[index,index2]))
    return
  }
  setRePages(reArrange(rePages,[index,index2]))
    return
  }
  transfer(type,index,index2)

  }
const transfer = (type,insert,remove) =>{
  console.warn(type,insert,remove)
  if(type==='workspace'){
    const res = rePages.filter((item,index)=>{
      if(index===remove){
        // setPages((prev)=>prev.splice(insert, 0, item))
        setPages((prev) => {
          const newPages = [...prev]; // Create a copy of the original array to avoid mutating it
          newPages.splice(insert, 0, item); // Insert the 'item' at the 'insert' index
          console.log('setnew',newPages)
          return newPages; // Return the updated array
        });
        return
      }
      return item
    })
  console.log('REsetpa',res)

    setRePages(res)
    return
  }
  const res = pages.filter((item,index)=>{
    if(index===remove){
      setRePages((prev) => {
        const newPages = [...prev]; // Create a copy of the original array to avoid mutating it
        newPages.splice(insert, 0, item); // Insert the 'item' at the 'insert' index
        return newPages; // Return the updated array
      });
      return
    }
    return item
  })
  console.log('setpa',res)
  setPages(res)
  return
}
const reArrange = (arr,index) =>{
  [arr[index[0]], arr[index[1]]] = [arr[index[1]], arr[index[0]]];
return [...arr]
}
  return (
    <>
    <Grid container spacing={5} className="pdf-preview" onDragOver={(e) => onDragOver(e)}>
      {pages.map((page, index) => (
        <Grid item key={index}
          onDragStart={(e) => onDragStart(e, 'workspace', index)}
          onDrop={(e) => onDrop(e, "workspace", index)}
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
    <Grid container spacing={5} className="pdf-preview" onDragOver={(e) => onDragOver(e)}>
      {rePages.map((page, index) => (
        <Grid item key={index}
          onDragStart={(e) => onDragStart(e, 'recycle', index)}
          onDrop={(e) => onDrop(e, "recycle", index)}
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
      <div>
    <Download file={file} pages={[]}/>
  </div>
    </>
  );
}

export default PDFPreview; 