import React, { useState, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Axios from "../../utils/Axios"
import setAxiosAuthToken from "../../utils/checkAxioAuth";
import useChangeInputConfig from "../../hooks/inputFieldHooks";
import { AuthContext } from "../../context/AuthContext";
import {  useSnackbar } from 'notistack';
import "./Login.css";

function Login(props) {
  const {
    state: { user }, dispatch
  } = useContext(AuthContext);

  const { enqueueSnackbar } = useSnackbar();
  const [
    email,
    handleEmailChange,
    isEmailError,
    emailErrorMessage,
    emailcanSubmit,
    emailOnFocus,
    handleEmailOnFocus
  ] = useChangeInputConfig("email");

  const [
    password,
    handlepasswordChange,
    isPasswordError,
    passwordErrorMessage,
    passwordcanSubmit,
    passwordOnFocus,
    handlepasswordOnFocus
  ] = useChangeInputConfig("password");

  const [canSubmit, setCanSubmit] = useState(true);


  useEffect(() => {
    if (user !== null) {
      props.history.push("/");
    }

    if (emailcanSubmit === false && passwordcanSubmit === false) {
      console.log(canSubmit)
      if (emailOnFocus && passwordOnFocus) {
        if (
          emailErrorMessage.length === 0 &&
          passwordErrorMessage.length === 0
        ) {
          setCanSubmit(false)
          console.log(canSubmit)
        }
      }
    }
    else {
      setCanSubmit(true)
    }
  }, [emailcanSubmit, passwordcanSubmit]);

  var variant = 'success'
  async function handleOnSubmit(event) {
    event.preventDefault();

    try {
      let result = await Axios.post("/api/user/login", {
        email: email,
        password: password,
      });

      let jwtToken = result.data.payload;
      let decodedToken = jwtDecode(jwtToken);

      setAxiosAuthToken(jwtToken);

      dispatch({
        type: "LOGIN",
        user: {
          email: decodedToken.email,
          userImage: decodedToken.userImage,
          userName: decodedToken.userName,
          postArray: decodedToken.postArray
        },
      });
      
      enqueueSnackbar('Successfully Logged In', { variant });
      window.localStorage.setItem("jwtToken", jwtToken);
      props.history.push("/");
    }
 
    catch (e) {
      enqueueSnackbar(e.response.data.payload, 'error')
    }
  }


  return (
    <div>
      <div id="backgroundDiv"></div>
      <div className="container2">
        <div className="form-text">Log In</div>

        <div className="form-div">
          <form className="form" onSubmit={handleOnSubmit}>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={handleEmailOnFocus}
                  autoFocus
                />
                <div className="errorMessage">{isEmailError && emailErrorMessage}</div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onFocus={handlepasswordOnFocus}
                  onChange={handlepasswordChange}
                />
                <div className="errorMessage">
                  {isPasswordError && passwordErrorMessage}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={canSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
