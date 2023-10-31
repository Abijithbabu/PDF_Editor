import { Badge, Box, Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Download from './Download'
import { AnimatePresence, motion } from "framer-motion";
import DeleteIcon from '@mui/icons-material/Delete';

function PDFPreview({ file, Pages, handleSelection, selected }) {
  const [pages, setPages] = useState(Pages)
  const [rePages, setRePages] = useState([])
  const [binOpen, setBinOpen] = useState(false);
  let lastExecutionTime = 0;
  const cooldownTime = 500;

  const onDragStart = (ev, id, index) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("index", index);
  }
  useEffect(() => {
    if (!rePages.length) setBinOpen(false)
  }, [rePages])

  const handleOpen = () => {
    if (rePages.length)
      setBinOpen(prev => !prev)
  }

  const onDrop = (ev, type, index) => {
    const id = ev.dataTransfer.getData("id");
    if (type !== id) {
      handleDrop(ev, type, index)
    }
  }
  const handleDrop = (ev, type, index) => {
    const currentTime = Date.now();
    if (currentTime - lastExecutionTime >= cooldownTime) {
      const id = ev.dataTransfer.getData("id");
      const index2 = parseInt(ev.dataTransfer.getData("index"));
      if (type === id) {
        if (type === 'workspace') {
          setPages(reArrange(pages, [index, index2]))
          return
        }
        setRePages(reArrange(rePages, [index, index2]))
        return
      }
      transfer(type, index, index2)
      lastExecutionTime = currentTime; // Update the last execution time
    }
  }

  const transfer = (type, insert, remove) => {
    if (type === 'workspace') {
      const res = rePages.filter((item, index) => {
        if (index === remove) {
          setPages((prev) => {
            const newPages = [...prev]; // Create a copy of the original array to avoid mutating it
            newPages.splice(insert, 0, item); // Insert the 'item' at the 'insert' index
            return newPages; // Return the updated array
          });
        } else return item
      })
      setRePages(res)
      return
    }
    const res = pages.filter((item, index) => {
      if (index === remove) {
        setRePages((prev) => {
          const newPages = [...prev]; // Create a copy of the original array to avoid mutating it
          newPages.splice(insert, 0, item); // Insert the 'item' at the 'insert' index
          return newPages; // Return the updated array
        });
      } else return item
    })
    setPages(res)
    return
  }
  const reArrange = (arr, index) => {
    const newArr = [...arr];
    [newArr[index[0]], newArr[index[1]]] = [newArr[index[1]], newArr[index[0]]];
    return newArr
  }
  return (
    <>
      <Grid container p={5} height={'100vh'} alignContent={'space-between'} >
        <Grid item container spacing={5} direction={'column'} m={0} alignContent={'flex-start'} className="pdf-preview" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, "workspace", pages.length)}>
          {pages.map((page, index) => (
            <Grid item key={index}
              onDragStart={(e) => onDragStart(e, 'workspace', index)}
              onDrop={(e) => handleDrop(e, "workspace", index)}
              onClick={() => handleSelection(Number(page?.key) + 1)}
              draggable
            >
              <div className={Number(page?.key) + 1 == selected ? "pdf-preview-selected" : 'pdf-preview-page'} >
                {page}
              </div>
              <span>{Number(page?.key) + 1}</span>
            </Grid>
          ))
          }
        </Grid>
        <Grid item container pl={10} spacing={5} justifyContent={'space-between'} alignItems={'end'}>

          <Box
            display="flex"
            component={motion.div}
            flexDirection="row"
            onClick={handleOpen}
            initial={{ height: "10vh", width: "50px" }}
            animate={{
              height: binOpen ? "30vh" : "14vh",
              width: binOpen ? "fit-content" : "15vh",
              backgroundColor: binOpen ? "" : "#1C1C24",
              opacity: binOpen ? 0.7 : 1,
              minWidth: binOpen ? '150px' : ''
            }}
          >

            {binOpen ?
              <Grid container spacing={5} rowSpacing={6} className="pdf-bin" direction={'column'} alignContent={'flex-start'}
                sx={{
                  overflowY: 'hidden',
                  overflowX: 'auto',
                  maxWidth: '450px',
                }}
                onDrop={(e) => onDrop(e, "recycle", rePages.length)}
                onDragOver={(e) => e.preventDefault()}
              >
                {rePages.map((page, index) => (
                  <Grid item key={index}
                    onDragStart={(e) => onDragStart(e, 'recycle', index)}
                    onDrop={(e) => handleDrop(e, "recycle", index)}
                    onClick={() => handleSelection(Number(page?.key) + 1)}
                    draggable
                  >
                    <div className={parseInt(page?.key) + 1 == selected ? "pdf-preview-selected" : 'pdf-preview-page'} >
                      {page}
                    </div>
                    <span>{parseInt(page?.key) + 1}</span>
                  </Grid>
                ))
                }
              </Grid>
              :
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  padding: "35px",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "recycle", rePages.length)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                component={motion.div}>
                <Badge color="secondary" badgeContent={rePages.length} showZero >
                  <DeleteIcon fontSize="large" />
                </Badge>
              </Box>
            }
          </Box>
            <Download file={file} pages={pages} />
        </Grid>
      </Grid >
    </>
  );
}

export default PDFPreview; 