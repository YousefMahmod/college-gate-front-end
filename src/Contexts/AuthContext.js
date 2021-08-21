import { createContext, useReducer, useState} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { logInApi, signUpApi } from "../API/apiRequestes";
import { LOGIN_LINK } from "../Constants";
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
    const [logInError, setLogInError] = useState(null);
    const [token, setToken] = useState(() => {
        try {
            // Get from local storage by key
            const data = localStorage.getItem("token");
            
            // Parse stored json or if none return initialValue
            return data ? data : null;
        } catch (error) {
            // If error also return initialValue
            
            return null;
        }
    });

    const handlerSignOut = () => {

        localStorage.clear();
        
        setToken(null);
        setUser(null);
        setLogInError(null);
    }

    const hadnlerLoginError = () => {

        setLogInError(null);
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

    const logIn = (userType, userInfo) => {


        logInApi(userType, userInfo).then(({data: auth, res}) => {

            if(res.ok){

                console.log(auth);
                localStorage.setItem("user", JSON.stringify(auth.user));
                setUser(auth.user);
        
                localStorage.setItem("token", JSON.stringify(auth.token));
                setToken(auth.token);
                
                return;
            }
            else if(res.status === 401) {

                setLogInError("incorrect email or password");
                
            }
            else {
                setLogInError(auth.message);
                console.log(auth.message);
            }
        })
        .catch(err => {
            console.log(err.message);
        })
        
        
        // const {data: auth, res} = await logInApi(userType, userInfo);

        // if(res.status !== 401){

        //     console.log(auth);
        //     localStorage.setItem("user", JSON.stringify(auth.user));
        //     setUser(auth.user);
    
        //     localStorage.setItem("token", JSON.stringify(auth.token));
        //     setToken(auth.token);
            
        //     return;
        // }
        // else {

        //     setLogInError(auth.message);

        // }
     
        
        

        // if(auth) {

        //     localStorage.setItem("user", JSON.stringify(auth.user));
        //     setUser(auth.user);

        //     localStorage.setItem("token", JSON.stringify(auth.token));
        //     setToken(auth.token);
            
        //     return;
        // }
        // setLogInError(true);
        
    }

    const signUp = async (userType, userInfo) => {

        const user = await signUpApi(userType, userInfo);

        if(user) {

            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);

            localStorage.setItem("token", "DefaultData");
            setToken("DefaultData");
            
            return;
        }

        setSignUpError(true);

    }
  
    return ( 
        <AuthContext.Provider value={{user, token, logInError, hadnlerLoginError, logIn, signUp, handlerSignOut}}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;