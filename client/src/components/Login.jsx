import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { Close } from "@mui/icons-material";
import { gLogin, login } from "../utils/api";
import notify from "../utils/notification";

const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID ="935019407967-lo70id2odmnnahp9a7md43d077669inu.apps.googleusercontent.com";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const auth = await login(values);
        if(auth.data.status){
            console.log(auth)
            dispatch({ type: "login", payload: auth.data.user })
            navigate("/")
        }
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error?.response?.data?.message || error.message });
        helpers.setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: "profile",
      });
    }
    gapi.load("client:auth2", start);
  });
  const ResponseGoogle = async (res) => {
    if (res.error) {
      notify({ message: "Authentication failed", title: 'Error !', type: 'danger' });
    } else {
      const auth = await gLogin(res.profileObj);
      if (auth.data.status) {
        dispatch({ type: "login", payload: auth.data.user });
        navigate("/");
      }
    }
  };
  return (
  <>
  <Close sx={{pl:0}} onClick={()=>navigate("/")}/>
    <Box
      sx={{
        // flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: "50px",
          width: "100%",
        }}
      >
        <div>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account? &nbsp;
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#1976D2" }}
                className="link"
              >
                Register
              </Link>
            </Typography>
          </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  variant="standard"
                  name="email"
                  size='small'
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
                  variant="standard"
                  name="password"
                  size="small"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>

              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
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
              <div className="App" style={{ marginTop: 18, width:'100%', backgroundColor:'#4285F4' }}>
              <GoogleLogin
                sx={{margin:'100px'}}
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Continue with Google Account"
                onSuccess={ResponseGoogle}
                onFailure={ResponseGoogle}
                cookiePolicy="single_host_origin"
                theme="dark"
              />
            </div>
            </form>
        </div>
      </Box>
    </Box>
  </>
  );
};

export default Page;
