import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { logout } from '../utils/api';

export default function AlertDialog({open,setOpen}) {
const dispatch = useDispatch()
const handleLogout = async ()=>{
    const res = await logout()
    if(res)dispatch({type:"logout"})
    setOpen(false)
}
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Logout ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By confirming you will be logging out from PDF Editor, 
            and your unsaved progress will be lost. Are you sure want to proceed ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Return</Button>
          <Button onClick={handleLogout} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
