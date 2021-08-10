import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom"
import LogIn from "./LogIn";
import styles from './LoginAndSignUp.module.css'
import SignUp from "./SignUp";
import { useState } from "react";
import { LOGIN_LINK, SIGNUP_LINK } from "../../Constants";
import SelectUser from "./SelectUser";
import RedirectHandler from "../RedirectHandler/RedirectHandler";

const LogInAndSignUp = ({dispatch}) => {

    const history = useHistory();
    const location = useLocation();
    const [userType, setUserType] = useState(() => {

        const data = localStorage.getItem("UserType")
        return data ? data : "department";
    });

    const handleOnChange = (e) => {

        localStorage.setItem("UserType", e.target.value);
        setUserType(e.target.value);
       
    }
    
    return ( 
        <div className={styles.login_signup}>
            
            <RedirectHandler />

            <SelectUser userType={userType} handleOnChange={ handleOnChange} />

            <Switch>

                <Route exact path={["/", "/auth", LOGIN_LINK]}>
                    <LogIn  userType= {userType}  />
                </Route>

                <Route path={SIGNUP_LINK}>
                    <SignUp userType= {userType} />
                </Route>
                
            </Switch> 

            <ul>
                <li className={styles.button_active}><Link to={LOGIN_LINK}>login</Link></li>
                <li><Link to={SIGNUP_LINK}>signup</Link></li>
            </ul>

        </div>
    );
}
 
export default LogInAndSignUp;