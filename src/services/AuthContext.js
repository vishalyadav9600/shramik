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
      .post("http://localhost:8080/login/user-login", {
        userName: emailText,
        password: passwordText,
      })
      .then((res) => {
        console.log(res.data.userName, "qwerty");
        // const { uName } = res.data.userName;
        setLoggedInUser(res.data.userName);
        console.log(loggedInUser, "inside func userName");
      })
      .then(() => history("/"));
  };

  console.log(loggedInUser, "userName");

  const signUp = () => {
    axios
      .post("http://localhost:8080/login/user-signup", {
        userName: emailText,
        password: passwordText,
      })
      .then((res) => {
        console.log(res, "logout");
        setLoggedInUser(null);
      })
      .then(() => history("/login"));
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
