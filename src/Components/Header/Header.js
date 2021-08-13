// import signout from "../../../public/Icons/sign-out-alt-solid.svg";

import { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { LOGIN_LINK } from "../../Constants";
import { AuthContext } from "../../Contexts/AuthContext";
import styles from './Header.module.css'

const Header = () => {
    
    const history = useHistory();
   
    const {handlerSignOut} = useContext(AuthContext);
   
    const signOut = () => {

        history.replace({pathname:LOGIN_LINK});
        
        handlerSignOut();
    }
   
    return ( 
        <div className={styles.header}>

            {/* {signOut && <Redirect to={LOGIN_LINK} />} */}
{/* 
            {showSideBarBlock && (<svg
    
                xmlns="http://www.w3.org/2000/svg" 
                className="icon icon-tabler icon-tabler-list" 
                width="52" 
                height="52" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="#ffffff" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                id="side-bar"
                >
                
                <title>SideBar</title>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="9" y1="6" x2="20" y2="6" />
                <line x1="9" y1="12" x2="20" y2="12" />
                <line x1="9" y1="18" x2="20" y2="18" />
                <line x1="5" y1="6" x2="5" y2="6.01" />
                <line x1="5" y1="12" x2="5" y2="12.01" />
                <line x1="5" y1="18" x2="5" y2="18.01" />
            </svg>)} */}

            <h1>College Gate</h1>
            
            {/* <img src="../Icons/sign-out-alt-solid.svg" alt="Exit Icon" /> */}
            {/* <iframe src="../Icons/sign-out-alt-solid.svg" width="35px" height="35px"></iframe> */}
            <img 
                src="Icons/sign-out-alt-solid.svg" 
                alt="signOut"
                onClick={ signOut} 
            />
            
        </div>
    );
}
 
export default Header;