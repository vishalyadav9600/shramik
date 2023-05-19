import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { Alert, AlertTitle } from "@mui/material";
import {
  Typography,
  makeStyles,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root_left_lower: {
    //border: '1px solid red',
    "& > :nth-child(1)": {
      fontFamily: "Mulish",
      fontSize: ".9rem",
    },
    "& > :nth-child(2)": {
      fontFamily: "Mulish",
      fontSize: "1.8rem",
      fontWeight: "700",
    },
  },

  login_button: {
    width: "100%",
    marginTop: "20px",
    background: theme.palette.green,
    color: "white",
    "& :hover": {
      color: "black",
      //  background: 'lightgreen',
    },
  },

  recommendation: {
    fontFamily: "Mulish",
    fontSize: ".9rem",
  },
  recommendation_link: {
    fontFamily: "Mulish",
    fontWeight: "600",
    fontSize: ".9rem",
    cursor: "pointer",
    marginLeft: "5px",
  },
}));

import Textfield from "../partials/FormUI/Textfield";
import { signup } from "../../store/actions/authActions";

export default function SignUpForm({ onclick, setClickData, showToast, path }) {
  // const [emailText, setEmailText] = useState("");
  // const [passwordText, setPasswordText] = useState("");
  const { emailText, setEmailText, passwordText, setPasswordText, signUp } =
    useContext(AuthContext);
  const history = useNavigate();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { root_left_lower, login_button, recommendation, recommendation_link } =
    useStyles();

  // const postUser = () => {
  //   console.log("jssj");
  //   axios
  //     .post("http://localhost:8080/login/user-signup", {
  //       userName: emailText,
  //       password: passwordText,
  //     })
  //     .then((res) => console.log(res.json))
  //     .then(() => history("/login"));
  // };

  return (
    <div className={root_left_lower}>
      <Typography>get your food</Typography>
      <Typography variant="h1" component="h1">
        Create an Account
      </Typography>
      {/* third */}
      <Box marginTop="20px">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values) => {
            await dispatch(signup(values));

            if (window.store.getState().authReducer.authenticated === true) {
              await setClickData({
                type: "success",
                content: "You account was successfully created",
              });
              showToast();
              navigate(path || "/dashboard");
            } else {
              await setClickData({
                type: "error",
                content: window.store.getState().authReducer.error,
              });
              showToast();
            }
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First Name is Required"),
            lastName: Yup.string().required("Last Name is Required"),
            email: Yup.string()
              .email("Invalid email format")
              .required("Required"),
            password: Yup.string()
              .min(6, "password must be atleast 6 characters")
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "password must match")
              .required("Please confirm password 😱"),
          })}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <Grid container>
                <Grid xs={12} item>
                  {/* <Box marginTop="10px">
                    <Textfield name="firstName" helpertext="First Name" />
                  </Box>
                  <Box marginTop="10px">
                    <Textfield name="lastName" helpertext="Last Name" />
                  </Box> */}
                  <Box marginTop="10px">
                    <input
                      type="text"
                      placeholder="email"
                      onChange={(e) => setEmailText(e.target.value)}
                    />
                    {/* <Textfield
                      name="email"
                      helpertext="Email Address"
                      onChange={(e) => setEmailText(e.target.value)}
                    /> */}
                  </Box>

                  <Box marginTop="10px">
                    <input
                      type="password"
                      placeholder="password"
                      onChange={(e) => setPasswordText(e.target.value)}
                    />
                    {/* <Textfield
                      onChange={(e) => setPasswordText(e.target.value)}
                      type="password"
                      name="password"
                      helpertext="Password"
                    /> */}
                  </Box>
                  {/* <Box marginTop="10px">
                    <Textfield
                      type="password"
                      name="confirmPassword"
                      helpertext="Confirm Password"
                    />
                  </Box> */}
                  <Box>
                    <Button
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress color="secondary" size="1rem" />
                        ) : null
                      }
                      className={login_button}
                      disableElevation
                      variant="contained"
                      type="submit"
                      onClick={async () => {
                        await signUp();
                      }}
                    >
                      Sign Up
                    </Button>
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
          Already have an account?
        </Typography>
        <Typography
          onClick={() => onclick("login")}
          color="secondary"
          className={recommendation_link}
        >
          Log In
        </Typography>
      </Box>
    </div>
  );
}
