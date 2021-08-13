import { useContext } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { DEPARTMENT_WARNINGS_LINK } from "../../Constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Employee = () => {

    const match = useRouteMatch();

    return ( 

        
     
        <Route path={[match.path, DEPARTMENT_WARNINGS_LINK]} >
            <div>Warnings</div>
        </Route>
     
       
    );
}
 
export default Employee;