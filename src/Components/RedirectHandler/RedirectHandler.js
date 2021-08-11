import { useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { LOGIN_LINK, SIGNUP_LINK } from "../../Constants";
import { AuthContext } from "../../Contexts/AuthContext";

const RedirectHandler = () => {

    // console.log("RedirectHandler.js");

    const history = useHistory();

    let path="";
    let redirect = false;

    const {token} = useContext(AuthContext);
    const {user} = useContext(AuthContext);

    // console.log("RedirectHandler (token)", token);
    // console.log("RedirectHandler (user)", user);

    const location = useLocation();
    const pathName = location.pathname;

    // console.log("current pathName", pathName);

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
            path = `/${user.type.toLowerCase()}`;
            // history.replace({pathname: path});
            // location.pathname = path;

            //take care because the current path will continue to enter current component
            //un amount
        }
        //right path

    }
    else {
        
        if(pathName === "/auth") {

            path = LOGIN_LINK;
            redirect = true;
            
        }
        else if(pathName !== "/"  &&
        pathName !== LOGIN_LINK && pathName !== SIGNUP_LINK) {
          
            path = LOGIN_LINK;
            redirect = true;
            // history.replace({pathname: path});
            // location.pathname = path;
        }
    }

    // console.log("RedirectHandler (path)", path);
    // console.log("RedirectHandler (redirect)", redirect);
    
    return ( 

        <div>
            {redirect && <Redirect to={path} />}
        </div>
        
    );
}
 
export default RedirectHandler;