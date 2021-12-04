import React, { useContext} from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/header/header";
import LoginHeader from "./components/header/LoginHeader"

const Login = React.lazy(() => import("./components/Login/Login"));
const SigIn = React.lazy(() => import("./components/Signup/Signup"));
const Home = React.lazy(() => import("./components/Home/home"));
const Main = React.lazy(() => import("./components/Main/Main"));

function MainRouter() {
  const {
    state: { user }
  } = useContext(AuthContext);
  return (
    <>
      {user !== null ? <Header /> : <LoginHeader />}
      <Switch>
        <Route
          exact
          path="/login"
          component={Login}
        />
        <Route
          exact
          path="/signup"
          component={SigIn}
        />
        <PrivateRoute exact
          path="/"
          component={Home}
        />
        <PrivateRoute
          exact
          path="/main/:category"
          component={Main}
        />
      </Switch>
    </>
  );
};

export default MainRouter;
