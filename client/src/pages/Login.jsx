import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LoginForm from '../components/Login'
import Register from '../components/Register'
import Home from './Home';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1C1C24',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = ({type='login'}) => {

  return (
    <>
    <Home/>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <>
        <Box sx={style}>
        {type === 'login' ? <LoginForm/> : <Register/> } 
        </Box>
      </>
      </Modal>
    </>
  );
}

export default Login