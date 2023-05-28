import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInMobNumber, setLoggedInMobNumber] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [mobNumber, setMobNumber] = useState("");

  const history = useNavigate();

  const signIn = async () => {
    axios
      .post("https://shramik-location-apis.onrender.com/login", {
        username: emailText,
        password: passwordText,
      })
      .then((res) => {
        console.log(res, "qwerty");
        setLoggedInUser(res.data.userName);
        setLoggedInMobNumber("+91" + res.data.mobile_number);
        setLoggedInUserId(res.data.id);
        localStorage.setItem("user-auth", res.data.access_token);
      })
      .then(() => history("/"));
  };

  const signUp = async () => {
    axios
      .post("https://shramik-location-apis.onrender.com/signup", {
        username: emailText,
        password: passwordText,
        mobile_number: mobNumber,
        address: "jameen pe jaha bhagwan dede",
      })
      .then((res) => {
        setLoggedInUser(null);
      })
      .then(() => history("/login"));
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        loggedInMobNumber,
        setLoggedInMobNumber,
        loggedInUserId,
        setLoggedInUserId,
        emailText,
        setEmailText,
        mobNumber,
        setMobNumber,
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
