import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const history = useNavigate();

  const signIn = () => {
    axios
      //   .post("http://localhost:8080/login/user-login", {
      .post("https://shramik-location-apis.onrender.com/login", {
        // userName: emailText,
        // password: passwordText,
        username: emailText,
        password: passwordText,
        // mobile_number: "6392631899",
        // address: "jameen pe jaha bhagwan dede",
      })
      .then((res) => {
        console.log(res, "qwerty");
        // const { uName } = res.data.userName;
        setLoggedInUser(res.data.userName);
        localStorage.setItem("user-auth", res.data.access_token);
        console.log(loggedInUser, "inside func userName");
      })
      .then(() => history("/"));
  };

  console.log(loggedInUser, "userName");

  const signUp = () => {
    axios
      //   .post("http://localhost:8080/login/user-signup", {
      .post("https://shramik-location-apis.onrender.com/signup", {
        // userName: emailText,
        // password: passwordText,
        username: emailText,
        password: passwordText,
        mobile_number: "6392631899",
        address: "jameen pe jaha bhagwan dede",
      })
      .then((res) => {
        console.log(res, "logout");
        setLoggedInUser(null);
      })
      .then(() => history("/login"));
  };

  //   localStorage.removeItem('itemKey');

  const logOut = () => {
    axios
      .post("http://127.0.0.1:5000/logout", {})
      .then((res) => {
        localStorage.removeItem("user-auth");
      })
      .then(() => history("/"));
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        emailText,
        setEmailText,
        passwordText,
        setPasswordText,
        signIn,
        signUp,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
