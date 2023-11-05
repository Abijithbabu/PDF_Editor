import React, { useEffect, useState } from 'react'
import { Alert, Badge, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Close, Delete, Restore } from '@mui/icons-material';
import Download from './Download'
const Workspace = ({ file, Pages, handleSelection, selected }) => {

    const [pages, setPages] = useState(Pages)
    const [rePages, setRePages] = useState([])
    const [binOpen, setBinOpen] = useState(false);
    const [source, setSource] = useState({ src: 'workspace', index: 0 });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event, src, index, page) => {
        handleSelection(page)
        setSource({ src, index })
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
            <Box
                component={motion.div}
                animate={{
                    height: binOpen ? '50vh' : '70vh',
                    right: binOpen ? '0' : '100px',
                    borderRadius: binOpen ? '5px' : '5px 5px 0px 0px',
                }}
                className="pdf-preview"
                sx={{ maxWidth: { xs: '80vw', sm: '85vw', md: '35vw' }, margin: '10px 0px 0px 0px', backgroundColor: '#1C1C24' }}
                onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, "workspace", pages.length)}
            >
                <Alert severity="info"><Typography variant='caption'>
                    Drag page inside workspace to re-arrange or drag to bin to remove
                </Typography> </Alert>
                <Grid container spacing={5} m={0} alignContent={'flex-start'}  >
                    {pages.map((page, index) => (
                        <Grid item key={index}
                            align={'center'}
                            onDragStart={(e) => onDragStart(e, 'workspace', index)}
                            onDrop={(e) => handleDrop(e, "workspace", index)}
                            onClick={(e) => handleClick(e, "recycle", index, Number(page?.key) + 1)}
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
            </Box>
            <Box
                position="relative"
                textAlign="right"
                component={motion.div}
                animate={{
                    height: binOpen ? '33vh' : '13vh',
                    margin: binOpen ? '10px 0px 0px 0px' : '0',
                    borderRadius: binOpen ? '5px' : '0px 0px 5px 5px',
                }}
                sx={{ maxWidth: { xs: '80vw', sm: '85vw', md: '35vw' }, backgroundColor: '#1C1C24' }}
                className='pdf-bin'
            >
                {binOpen ?
                    <Grid container spacing={5} alignContent={'flex-start'}
                        onDrop={(e) => onDrop(e, "recycle", rePages.length)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {rePages.map((page, index) => (
                            <Grid item key={index}
                                align={'center'}
                                onDragStart={(e) => onDragStart(e, 'recycle', index)}
                                onDrop={(e) => handleDrop(e, "recycle", index)}
                                onClick={(e) => handleClick(e, "workspace", index, Number(page?.key) + 1)}
                                draggable
                            >
                                <div className={parseInt(page?.key) + 1 == selected ? "pdf-preview-selected" : 'pdf-preview-page'} >
                                    {page}
                                </div>
                                <span>{parseInt(page?.key) + 1}</span>
                            </Grid>
                        ))
                        }
                        <Close fontSize='small' onClick={handleOpen} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} />
                    </Grid>
                    :
                    <>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex",
                                cursor:'pointer'
                            }}
                            onClick={handleOpen}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, "recycle", rePages.length)}
                            whileHover={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 5 }}
                            component={motion.div}>
                            <Badge color="secondary" badgeContent={rePages.length} showZero >
                                <Delete fontSize="large" />
                            </Badge>
                        </Box>
                        <Download file={file} pages={pages} />
                    </>
                }
            </Box>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => {
                    transfer(source.src, source.src === 'workspace' ? rePages.length : pages.length, source.index)
                    handleClose()
                }}>
                   {source.src === 'workspace' ? <><Restore fontSize='small'/> <Typography variant='caption' paddingLeft={1}>restore</Typography></> :
                    <><Delete fontSize='small'/><Typography variant='caption' paddingLeft={1}>remove</Typography></> }
                </MenuItem>
            </Menu>
        </>
    )
}

export default Workspace
