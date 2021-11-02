import React , { useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    state: { user }
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routerProps) =>
        user? (
          <Component {...routerProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;