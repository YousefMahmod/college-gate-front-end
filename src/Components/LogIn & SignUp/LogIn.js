import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import styles from './LoginAndSignUp.module.css';
import SelectUser from "./SelectUser";
// import { useHistory } from "react-router-dom";

const LogIn = ({userType}) => {
    // const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {logIn} = useContext(AuthContext);

    console.log("LogIn.js");
    console.log(userType);
    // history.push({pathname:'/login'});
    // console.log(UserType);
    // useEffect(() => {

    //     let el = document.querySelector(".radio_container");
    //     console.log(el);
    //     // el.setAttribute("checked", "checked");

    // }, []);

    const handleSubmit = (e) => {

        e.preventDefault();

        const userInfo = {email:username, password};
        // console.log(userInfo);
        logIn(userType, userInfo);
        // dispatch({type:"LOGIN", userInfo, typeOfUser});
        setUsername("");
        setPassword("");
        // history.replace({pathname:'/check-type'});
        //don't forget to handle the path 
    };
   
    return (

        <form onSubmit={handleSubmit} >

            <input 
                type="email" 
                required 
                id="email" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Email"
            />

            <br />
            <br />

            <input 
                type="password" 
                required 
                id="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            
            />
            <br />
            <br />

            <input type="submit" value="log in" className={styles.login_signup_button}/>

        </form> 
        
    );
}
 
export default LogIn;