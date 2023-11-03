import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { Close } from '@mui/icons-material';

const Page = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({ type: 'user' });

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .min(6)
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const { email, name, password } = values
        setUser({ ...user, email, name, password })
        dispatch({
            type: "user_login",
            payload: res.data,
          });

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
const GenerateTextBox = (props) =>{
    const { name, type, label} = props
    return (
        <TextField
        error={!!(formik.touched.name && formik.errors[name])}
        fullWidth
        helperText={formik.touched.name && formik.errors[name]}
        label={label}
        name={name}
        variant='standard'        
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values[name]}
        type={type}
      />
    )
}
  return (
    <>
      <Close sx={{pl:0}} onClick={()=>navigate("/")}/>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '50px',
            width: '100%'
          }}
        >
            <Stack spacing={1} sx={{ mb: 3 }} >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography color="text.secondary" variant="body2" >
                Already have an account?&nbsp;
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: '#1976D2' }}
                  className="link"
                >
                  Sign in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <GenerateTextBox name='name' type='text' label='Username'/>
                <GenerateTextBox name='email' type='email' label='Email Address'/>
                <GenerateTextBox name='password' type='password' label='Password'/>
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 5 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>       
        </Box>
      </Box>
    </>
  );
};

export default Page;
