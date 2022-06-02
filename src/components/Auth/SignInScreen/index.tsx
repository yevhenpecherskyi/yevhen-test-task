import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { rgbToHex } from '@mui/system';
import { Formik } from 'formik';
import CardMedia from '@mui/material/CardMedia';
import { signInUser } from '../../../common/firebaseApp';
import { UIContext } from '../../Unknown/UIContext';

type Errors = {
  email: string;
  password: string;
};

const image =
  'https://img4.teletype.in/files/7c/44/7c441375-4c36-4d68-a8a9-e58d30a4bbe0.jpeg';

const SignInScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const [showPassword, setPassword] = useState(false);

  const handleSignIn = React.useCallback(async () => {
    setAlert({
      show: true,
      severity: 'info',
      message: 'Sign in button was clicked.',
    });
  }, [setAlert]);

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <CardMedia
            component="img"
            height="900"
            width="720"
            image={image}
            alt="main"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxWidth="sm"
          sx={{
            width: 720,
          }}
        >
          <Typography sx={{ marginBottom: 12 }}>
            <CardMedia
              component="img"
              height="40"
              width="173"
              image="https://lh3.googleusercontent.com/Ro2fCldQk-0m8Cw118zUdgSLPWBElnTd0XPv9Vbd5Gffn6GgXFGAdFeoaRQam7tuhAfDjr94_wPCcIIXANJiwSLcuIZXv_h0Y4kp0db85HDxY8EwbWHdPrhOdHvQNj4eLyYX5-lgv9uCaJdac9roRMPoPVUqNvR2kl-EjjgW2F2jgTTswojBWWcurrY2lDVcY7wPhuHWnpCyRAV1G3lb3W5u1necu9dG2o2zn0EAzpntjpW5uXYMojMzGolqDR8gVlr0XbHXZGblXZ-u1mHbI37sz8oyE96UQ5JGLLeGlpYcTDdfjoEEVXzKpORINttxm7BSVD8MtbfbCmO6GKXxhzEF80aIa_9pvoMLRHmAyjXqm1Waw3ZlK-ywCmB55D2wJ31PfXJWWf_60gO_JcUjERANJXea7HrKROuA9rgLjE1qb-ORUICTJLy62OJQhHWdUJqvHGznSeENfzFg3PHZD-yD3KLwhmHlTqGLVHl6s-2xh9COaA3u_W1y3nVK4xtJZpk0EsBavElwNsLbYDYB9HSbu1KdLYZH6ATpaouU1zmNmoBdN97MLTB13HTCO9SezpPostr5uYxa4C8Swtf0qWqySTYw4emLsu2sj-r2W0Z_-6vKuaDLa1lu1416mjSPYXfvfGUJu2ee-OSNNYPf195XGBKlTZSEdOceT0xhajprK4aoddsJ0Dgrd1FThFpXtcIzjMKSe53_Dd11WUDAmlnzej-fptzBYgmlXDxcR6TkfRTOcNpFEPl1m_oV2Q=w173-h37-no?authuser=0"
              alt="logo"
            />
          </Typography>

          <Typography
            sx={{
              marginBottom: 8,
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            Login
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Formik
                initialValues={{ email: '', password: '' }}
                validate={(values) => {
                  const errors: Errors = { email: '', password: '' };
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email,
                    )
                  ) {
                    errors.email = 'Invalid email address';
                  }

                  if (!values.password) {
                    errors.password = 'Required';
                  } else if (
                    !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g.test(
                      values.password,
                    )
                  ) {
                    errors.password = 'Invalid password';
                  }
                }}
                onSubmit={({ email, password }, { setSubmitting }) => {
                  setSubmitting(false);
                  // eslint-disable-next-line
                  console.log(email, password);
                  signInUser(email, password).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // eslint-disable-next-line
                    console.log('error Code:', errorCode, 'message:', errorMessage);
                    return setAlert({
                      show: true,
                      severity: 'error',
                      message: errorMessage,
                    });
                  });
                  setAlert({
                    show: true,
                    severity: 'info',
                    message: 'Sign in success.',
                  });
                }}
              >
                {({
                  handleSubmit,
                  isSubmitting,
                  values,
                  handleChange,
                  errors,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box sx={{ marginBottom: 2 }}>
                        <OutlinedInput
                          sx={{
                            width: 375,
                          }}
                          fullWidth
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={values.email}
                          required
                          onChange={handleChange}
                          aria-describedby="component-error-text"
                        />
                        {errors.email ? (
                          <Typography variant="subtitle2" color="red">
                            {errors.email}
                          </Typography>
                        ) : null}
                      </Box>

                      <Box sx={{ marginBottom: 2 }}>
                        <OutlinedInput
                          sx={{
                            width: 375,
                          }}
                          fullWidth
                          required
                          name="password"
                          placeholder="Password"
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange}
                          aria-describedby="component-error-pass"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setPassword(!showPassword)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errors.password ? (
                          <Typography variant="subtitle2" color="red">
                            {errors.password}
                          </Typography>
                        ) : null}
                      </Box>

                      <Button
                        variant="contained"
                        type="submit"
                        disabled={
                          !isSubmitting && !!errors.email && !!errors.password
                        }
                        sx={{
                          marginBottom: 2,
                          width: 375,
                          height: 55,
                          backgroundColor: rgbToHex('#F50057'),
                          '&:hover': {
                            backgroundColor: rgbToHex('#F50057'),
                          },
                        }}
                      >
                        LOGIN
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SignInScreen;
