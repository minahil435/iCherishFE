import { createContext, useReducer } from "react";
import setAxiosAuthToken from "../utils/checkAuth"
import checkIfUserIsAuth from "../utils/checkAuth"
export const AuthContext = createContext({});

const initialState = {
    user: isUserExits()
};


function isUserExits() {
    if (checkIfUserIsAuth() != null) {
        return {
            email: checkIfUserIsAuth().email,
            userImage: checkIfUserIsAuth().userImage,
            userName: checkIfUserIsAuth().userName,
            postArray: checkIfUserIsAuth().postArray
         }
    }
    return null
}

function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                user: {
                    email: action.user.email,
                    userImage: action.user.userImage,
                    userName: action.user.userName,
                    postArray: action.user.postArray
                },
            };
        case "LOG_OUT":
            setAxiosAuthToken(null);
            window.localStorage.removeItem("jwtToken");
            return {
                user: null,
            };
            
        case "Update":
            return {
                user: {
                    email: initialState.user.email,
                    userImage: initialState.user.userImage,
                    userName: initialState.user.userName,
                    postArray: action.user.postArray
                },
            };
        default:
            return state;
    }
}

console.log(initialState.user)
function AuthContextWrapper({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextWrapper;