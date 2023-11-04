import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LoginForm from '../components/Login'
import Register from '../components/Register'
import Home from './Home';
import { authStyle } from '../utils/constants';

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
        <Box sx={authStyle}>
        {type === 'login' ? <LoginForm/> : <Register/> } 
        </Box>
      </>
      </Modal>
    </>
  );
}

export default Login