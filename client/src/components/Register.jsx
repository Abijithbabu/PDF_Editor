import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Close } from '@mui/icons-material';
import { Register } from '../utils/api';

const Page = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
        .min(3)
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .min(8)
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await Register(values)
        if(res.data.status){
            dispatch({
                type: "login",
                payload: res.data.user,
              });
            navigate('/')
        }
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error?.response?.data?.message || error.message });
        helpers.setSubmitting(false);
      }
    }
  });

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
              <Stack spacing={2}>
              <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  variant='standard'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  variant='standard'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  variant='standard'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
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
