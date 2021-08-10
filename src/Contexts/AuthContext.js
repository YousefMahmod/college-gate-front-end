import { createContext, useReducer, useState} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { logInApi, signUpApi } from "../API/apiRequestes";
import { authReducer } from "../Reducers/AuthReducer";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const history = useHistory();
    
    // const location = useLocation();
    // const [auth, dispatch] = useReducer(authReducer, null);
    const [user, setUser] = useState(() => {

        try {
            // Get from local storage by key
            const data = localStorage.getItem("user");
            // Parse stored json or if none return initialValue
            return data ? JSON.parse(data) : null;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return null;
        }

    } );
    const [signUpError, setSignUpError] = useState(false);
    const [logInError, setLogInError] = useState(false);
    const [token, setToken] = useState(() => {
        try {
            // Get from local storage by key
            const data = localStorage.getItem("token");
            console.log(data);
            // Parse stored json or if none return initialValue
            return data ? data : null;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return null;
        }
    });

    const handlerSignOut = () => {

        localStorage.clear();
        setToken(null);
        setUser(null);
    }

   
    // if auth get message error like invalid email or password triger loginError
    //may get bad request
    const getUser = (initialValue) => {

        try {
            // Get from local storage by key
            const data = localStorage.getItem("user");
            // Parse stored json or if none return initialValue
            return data ? JSON.parse(data) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
        
    }

    const getToken = () => {

        let data = localStorage.getItem("token");
        if(data === undefined){
            return null;
        }
        data = JSON.parse(data);
        return data;
    }

    const logIn = async (userType, userInfo) => {

        console.log("userType", userType);
        console.log("userInfo", userInfo);

        const auth = await logInApi(userType, userInfo);

        console.log("Data from AuthContext", auth);

        if(auth) {

            localStorage.setItem("user", JSON.stringify(auth.user));
            setUser(auth.user);

            localStorage.setItem("token", JSON.stringify(auth.token));
            setToken(auth.token);
            
            // history.push({pathname:`/${userType}`});
            return;
        }
        setLogInError(true);
        console.log("setLogInError", logInError);
    }

    const signUp = async (userType, userInfo) => {

        const user = await signUpApi(userType, userInfo);

        console.log("userType", userType);
        console.log("userInfo", userInfo);

        console.log("Data from AuthContext", user);

        if(user) {

            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);

            localStorage.setItem("token", "DefaultData");
            setToken("DefaultData");
            
            // history.push({pathname:`/${userType}`});
            return;
        }

        setSignUpError(true);
        console.log("SignUpError", signUpError);

    }
    // if(auth) {
    //    setLoggedIn(true);
    //    //use history to redirect to the location of user
    //    //use localStorage to store data 
    // }
    return ( 
        <AuthContext.Provider value={{user, token, logIn, signUp, handlerSignOut}}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;