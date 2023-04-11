import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  makeStyles,
  Button,
  Grid,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

//local import
import Textfield from '../partials/FormUI/Textfield';
import { login } from '../../store/actions/authActions';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root_left_lower: {
    //border: '1px solid red',
    '& > :nth-child(1)': {
      fontFamily: 'Mulish',
      fontSize: '.9rem',
    },
    '& > :nth-child(2)': {
      fontFamily: 'Mulish',
      fontSize: '1.8rem',
      fontWeight: '700',
    },
  },

  login_button: {
    width: '100%',
    marginTop: '20px',
    background: theme.palette.green,
    color: 'white',
    '& :hover': {
      color: 'black',
      //  background: 'lightgreen',
    },
  },

  recommendation: {
    fontFamily: 'Mulish',
    fontSize: '.9rem',
  },
  recommendation_link: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '.9rem',
    cursor: 'pointer',
    marginLeft: '5px',
  },
}));

export default function SignInForm({ onclick, setClickData, showToast, path }) {

  const[emailText,setEmailText]=useState("");
  const[passwordText,setPasswordText]=useState("");

  console.log(emailText)
  console.log(passwordText)

  const postUser=()=>{
    console.log("jssj")
    axios.post("http://localhost:8080/login/user-login",{
      userName:emailText,
      password:passwordText
    })
    .then(()=>console.log("Yes"))

  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    root_left_lower,
    login_button,
    recommendation,
    recommendation_link,
  } = useStyles();
  return (
    <div className={root_left_lower}>
      <Typography>get your food</Typography>
      <Typography variant="h1" component="h1">
        Login to Your Account
      </Typography>
      {/* third */}
      <Box marginTop="20px">
        <Formik
          initialValues={{
            loginEmail: '',
            loginPassword: '',
          }}
          onSubmit={async (values) => {
            await dispatch(login(values));

            if (!window.store.getState().authReducer.authenticated) {
              await setClickData({
                type: 'error',
                content: window.store.getState().authReducer.error,
              });
              showToast();
            }
          }}
          validationSchema={Yup.object().shape({
            loginEmail: Yup.string()
              .email('Invalid email format')
              .required('Required'),
            loginPassword: Yup.string()
              .min(6, 'password must be atleast 6 characters')
              .required('Password is required'),
          })}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <Grid container>
                <Grid xs={12} item>
                  <Box marginTop="10px">
                    <input type="text" placeholder='email' onChange={(e)=>setEmailText(e.target.value)} />
                    {/* <Textfield name="loginEmail" helpertext="Email Address" /> */}
                  </Box>

                  <Box marginTop="10px">
                  <input type="password" placeholder='password' onChange={(e)=>setPasswordText(e.target.value)} />
                    {/* <Textfield
                      type="password"
                      name="loginPassword"
                      helpertext="Password"
                      
                    /> */}
                  </Box>

                  <Box>
                    <button onClick={postUser}>Sign In</button>
                    {/* <Button
                      // startIcon={
                      //   isSubmitting ? (
                      //     <CircularProgress color="secondary" size="1rem" />
                      //   ) : null
                      // }
                      onclick={postUser}
                      className={login_button}
                      disableElevation
                      variant="contained"
                      type="submit"
                    >
                      Sign In
                    </Button> */}
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>

      {/* <div className={sign_up_google}>
    <img src="./social-google.svg" />
    <Typography>Sign up with Google</Typography>
  </div> */}
      <Box alignItems="center" display="flex" marginTop="10px">
        <Typography className={recommendation}>
          Dont have an account?
        </Typography>
        <Typography
          onClick={() => onclick('signup')}
          color="secondary"
          className={recommendation_link}
        >
          Sign Up
        </Typography>
      </Box>
    </div>
  );
}
