import React, { useState, useContext, useEffect } from "react";
import Axios from "../../utils/Axios"
import "./Signup.css";
import jwtDecode from "jwt-decode";
import setAxiosAuthToken from "../../utils/checkAxioAuth";
import useChangeInputConfig from "../../hooks/inputFieldHooks";
import { AuthContext } from "../../context/AuthContext";
import { Link, NavLink } from "react-router-dom";

function Signup(props) {

  const {
    state: { user }, dispatch
  } = useContext(AuthContext);

  const [
    email,
    handleEmailChange,
    isEmailError,
    emailErrorMessage, ,
    emailOnFocus,
    handleEmailOnFocus
  ] = useChangeInputConfig("email");

  const [
    names,
    handleNameChange,
    isNameError,
    nameErrorMessage, ,
    nameOnFocus,
    handleNameOnFocus
  ] = useChangeInputConfig("name");

  const [
    password,
    handlepasswordChange,
    isPasswordError,
    passwordErrorMessage,
    ,
    passwordOnFocus,
    handlepasswordOnFocus
  ] = useChangeInputConfig("password");

  const [canSubmit, setCanSubmit] = useState(true);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("")
  const [confirmPasswordOnFocus, setconfirmPasswordOnFocus] = useState(false)
  const [selectedFile, setselectedFile] = useState(null)

  useEffect(() => {
    if (user !== null) {
      props.history.push("/");
    }

    if (emailOnFocus && passwordOnFocus && confirmPasswordOnFocus && nameOnFocus) {
      if (
        nameErrorMessage.length === 0 &&
        emailErrorMessage.length === 0 &&
        passwordErrorMessage.length === 0 &&
        confirmPasswordError.length === 0 &&
        names.length !== 0 &&
        email.length !== 0 &&
        password.length !== 0 &&
        confirmPassword.length !== 0 &&
        selectedFile !== null
      ) {
        setCanSubmit(false)
      }
      else {
        setCanSubmit(true)
      }
    }
    else {
      setCanSubmit(true)
    }
  }, [nameOnFocus, emailOnFocus, passwordOnFocus, confirmPasswordOnFocus, emailErrorMessage, passwordErrorMessage, confirmPasswordError, selectedFile]);


  function onFileChange(event) {
    setselectedFile(event.target.files[0]);
  };

  function handleConfirmPasswordInput(e) {
    let value = e.target.value;
    setconfirmPassword(value)

    if (password !== e.target.value) {
      setconfirmPasswordError("Password does not match!")
    } else {
      setconfirmPasswordError("")
    }
  };

  function handleconfirmPasswordOnFocus() {
    setconfirmPasswordOnFocus(true)
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("userImage", selectedFile);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userName", names)

      let success = await Axios.post("/api/user/sign-up", formData);
      let jwtToken = success.data.payload;
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

      window.localStorage.setItem("jwtToken", jwtToken);
      props.history.push("/");

    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="MainSiginGrid">

      <div className="welcomeDiv">
        <div className="icherishDiv">
          <img id="icherishIcon" src={"/images/love-letter.png"} alt={"icherish"} />
          <div id="icherishName">iCherish</div>
        </div>

        <div id="welcomeiCherish">
          {"Welcome to iCherish"}
          <div id="slogon">
            {"If you love something, love it completely, share it, CHERISH IT!"}</div>
        </div>
      </div>

      <div className="Rightcontainer">
        <div id="haveAccount">
          <div>Already have a account?</div>
          <div><Link id="haveAccountButton" to="/login">LogIn!</Link></div>
        </div>

        <div className="containerFlex">
          <div className="container">
            <div className="form-text">Sign up</div>
            <div className="form-div">
              <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group-block">
                  <div className="block-container">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={names}
                      placeholder="name"
                      onChange={handleNameChange}
                      name="name"
                      onFocus={handleNameOnFocus}
                    />
                    <div className="errorMessage">{isNameError && nameErrorMessage}</div>
                  </div>
                </div>
                <div className="form-group-block">
                  <div className="block-container">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      value={email}
                      placeholder="Email"
                      onChange={handleEmailChange}
                      name="email"
                      // onBlur={this.handleOnBlur}
                      onFocus={handleEmailOnFocus}
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
                      value={password}
                      placeholder="Password"
                      onChange={handlepasswordChange}
                      name="password"
                      // onBlur={this.handleOnBlur}
                      onFocus={handlepasswordOnFocus}
                    />
                    <div className="errorMessage">
                      {isPasswordError && passwordErrorMessage}
                    </div>
                  </div>
                </div>
                <div className="form-group-block">
                  <div className="block-container">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      onChange={handleConfirmPasswordInput}
                      name="confirmPassword"
                      // onBlur={this.handleOnBlur}
                      onFocus={handleconfirmPasswordOnFocus}
                    />
                    <div className="errorMessage">
                      {/* {confirmPasswordError && confirmPasswordError} */}
                      {confirmPasswordError}
                    </div>
                  </div>
                </div>
                <div className="form-group-block">
                  <div className="block-container">
                    <input type="file" onChange={onFileChange} />
                  </div>
                </div>
                <div className="button-container">
                  <button type="submit" disabled={canSubmit} >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
