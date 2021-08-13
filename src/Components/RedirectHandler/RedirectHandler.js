import { useContext, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { LOGIN_LINK, SIGNUP_LINK } from "../../Constants";
import { AuthContext } from "../../Contexts/AuthContext";

const RedirectHandler = () => {

    // console.log("RedirectHandler.js");

    const history = useHistory();

    let path="";
    let redirect = false;

    // const [redirect, setRedirect] = useState(() => {

    //     const data = localStorage.getItem("redirect");
    //     return data ? data : false;
    // });

    const {token} = useContext(AuthContext);
    const {user} = useContext(AuthContext);

    const location = useLocation();
    const pathName = location.pathname;


    if(token) {

        //wrong path
        // if(pathName === "/"){
            
        //     redirect = true;
        //     path = `/${user.type.toLowerCase()}`;
        // }
        // console.log("first slice", pathName.split("/")[1]);
        // console.log("UserType", user.type.toLowerCase());

        if(pathName.split("/")[1] !== user.type.toLowerCase()) {

            redirect = true;
            // localStorage.setItem("redirect", true);
            // setRedirect(true);
            path = `/${user.type.toLowerCase()}`;
            // history.replace({pathname: path});
            // location.pathname = path;
            // console.log(history);
            //take care because the current path will continue to enter current component
            //un amount
        }
       
        //right path

    }
    else {
        
        if(pathName === "/auth") {

            path = LOGIN_LINK;
            redirect = true;
            // localStorage.setItem("redirect", true);
            // setRedirect(true);
            
        }
        else if(pathName !== "/"  &&
        pathName !== LOGIN_LINK && pathName !== SIGNUP_LINK) {
          
            path = LOGIN_LINK;
            redirect = true;
            // localStorage.setItem("redirect", true);
            // setRedirect(true);
            // history.replace({pathname: path});
            // location.pathname = path;
        }
       
    }
    
    console.log("currentLocation", location.pathname);
    // console.log("currentLocation", location);
    // console.log("RedirectHandler (path)", path);
    // console.log("RedirectHandler (redirect)", redirect);
    
    return ( 

        <div>
            {redirect && <Redirect to={path} />}
        </div>
        
    );
}
 
export default RedirectHandler;