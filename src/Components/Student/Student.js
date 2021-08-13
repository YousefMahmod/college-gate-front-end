import { useContext } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { STUDENT_COURSES_LINK, STUDENT_HOME_LINK, STUDENT_WARNINGS_LINK } from "../../Constants";
import { AuthContext } from "../../Contexts/AuthContext";
import Courses from "../Courses/Courses";
import NotFound from "../NotFound/NotFound";
import Home from "./Home";
import styles from "./Student.module.css";

const Student = () => {
    
    const user = useContext(AuthContext);
    const match = useRouteMatch();

    return ( 
       
        <Switch>

            <Route exact path={[match.path, STUDENT_HOME_LINK]}>
                <Home />
            </Route>

            <Route exact path={STUDENT_COURSES_LINK}>
                <Courses />
            </Route>

            <Route exact path={STUDENT_WARNINGS_LINK}>
                <div className={styles.home}>Warnings</div>
            </Route>

            <Route path="*">
                <NotFound />
            </Route>
            
        </Switch>
        
    );
}
 
export default Student
;