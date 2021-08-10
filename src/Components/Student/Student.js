import { Route, Switch } from "react-router-dom";
import { COURSES_LINK, HOME_LINK, WARNINGS_LINK } from "../../Constants";
import Home from "./Home";
import styles from "./Student.module.css";

const Student = ({user}) => {
    
    return ( 
       
        <Switch>
            <Route exact path={HOME_LINK}>
                <Home user={user} />
            </Route>

            <Route path={COURSES_LINK}>
                <div className={styles. home}>Courses</div>
            </Route>

            <Route path={WARNINGS_LINK}>
                <div className={styles.home}>Warnings</div>
            </Route>
        </Switch>
        
    );
}
 
export default Student
;