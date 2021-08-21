import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom"
import LogIn from "./LogIn";
import styles from './LoginAndSignUp.module.css'
import SignUp from "./SignUp";
import { useContext, useState } from "react";
import { LOGIN_LINK, SIGNUP_LINK } from "../../Constants";
import SelectUser from "./SelectUser";
import RedirectHandler from "../RedirectHandler/RedirectHandler";
import { AuthContext } from "../../Contexts/AuthContext";

const LogInAndSignUp = ({dispatch}) => {

    const history = useHistory();
    const location = useLocation();

    let styleLogin = styles.not_active_button;
    let styleSignup =  styles.not_active_button;
    
    const {hadnlerLoginError} = useContext(AuthContext);

    const [userType, setUserType] = useState(() => {

        const data = localStorage.getItem("UserType")
        return data ? data : "department";
    });

    const handleOnChange = (e) => {

        localStorage.setItem("UserType", e.target.value);
        setUserType(e.target.value);
       
    }
    if(location.pathname.includes( SIGNUP_LINK)) {
        
        styleSignup = styles.active_button;
    }
    else {
        styleLogin = styles.active_button;
    }
    
    return ( 
        <div className={styles.login_signup}>
            
            <RedirectHandler />

           

            <SelectUser userType={userType} handleOnChange={ handleOnChange} />
            
            <Switch>

                <Route exact path={["/", "/auth", LOGIN_LINK]}>
                    {/* <h1>Log in</h1> */}
                    
                    <LogIn  userType= {userType}  />
                </Route>

                <Route path={SIGNUP_LINK}>
                    <SignUp userType= {userType} />
                </Route>
                
            </Switch> 

            <ul>
                <li className={styleLogin} onClick={hadnlerLoginError}><Link to={LOGIN_LINK}>login</Link></li>
                <li className={styleSignup}><Link to={SIGNUP_LINK}>signup</Link></li>
            </ul>

        </div>
    );
}
 
export default LogInAndSignUp;