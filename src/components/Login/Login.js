import React, { useState, useContext, useEffect} from "react";
import jwtDecode from "jwt-decode";
import BackgroundImagesDisplay from "../Home/BackgroundImagesDisplay"
import Axios from "../utils/Axios";
import axios from "axios";
import setAxiosAuthToken from "../utils/checkAxioAuth";
import useChangeInputConfig from "../hooks/inputFieldHooks";
import { AuthContext } from "../../context/AuthContext";

import "./Login.css";

function Login(props){

  const {
    state: { user}, dispatch
  } = useContext(AuthContext);

  console.log(user)

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

  const BackgroundImages = [
    "/images/cover.jpg",
    "/images/cover1.jpg",
    "/images/cover2.jpg",
    "/images/cover3.jpg",

    "/images/cover4.jpg",
    "/images/cover.jpg",
    "/images/cover1.jpg",
    "/images/cover2.jpg",

    "/images/cover4.jpg",
    "/images/cover.jpg",
    "/images/cover1.jpg",
    "/images/cover2.jpg",
  ];
  
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
    else{
      setCanSubmit(true)
    }
  }, [emailcanSubmit, passwordcanSubmit]);


 async function handleOnSubmit (event) {
    event.preventDefault();

    try {
      let result = await Axios.post("/api/user/login", {
        email: email,
        password: password,
      });
       

       let jwtToken = result.data.payload;
       setAxiosAuthToken(jwtToken);
    
       let decodedToken = jwtDecode(jwtToken);
        dispatch({
        type: "LOGIN",
        user: {
          email: decodedToken.email,
          userImage: decodedToken.userImage
          
        },
      });

       window.localStorage.setItem("jwtToken", jwtToken);
       props.history.push("/");
    }

      // toast.success("Login success!");

 
    catch (e) {
      // if (e.response.status === 429) {
        console.log(e)
      // } else {
      // toast.error(e.response.data.payload);
      // }
    //   console.log(e)
    // }
  }
}


    return (
      <div>
        <div class="recipeGrid" >
          {BackgroundImages.map((item, index) => {
            return <BackgroundImagesDisplay
              key={item.id}
              item={item}
              index={index}
              searchModeOn = {false}
            />
          })
          }

        </div>
        <div className="container2">
          <div className="form-text">Login</div>

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
                    type="text"
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
