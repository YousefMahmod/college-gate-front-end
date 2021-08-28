import { useContext } from "react";
import {
	Redirect,
	Route,
	Switch,
	useLocation,
	useRouteMatch,
} from "react-router-dom";
import {
	STUDENT_COURSES_LINK,
	STUDENT_HOME_LINK,
	STUDENT_WARNINGS_LINK,
} from "../../Constants";
import { AuthContext } from "../../Contexts/AuthContext";
import { ItemsOfSideBarContext } from "../../Contexts/ItemsOfSideBarContext";
import UserDataContextProvider from "../../Contexts/UserDataContext";
import Course from "../Courses/Course";
import Courses from "../Courses/Courses";
import NotFound from "../NotFound/NotFound";
import Home from "./Home";
import styles from "./Student.module.css";

const Student = () => {
	const { user } = useContext(AuthContext);
	const match = useRouteMatch();
	const location = useLocation();
	const { listOfItems } = useContext(ItemsOfSideBarContext);

	if (location.pathname === "/student") {
		return <Redirect to={STUDENT_HOME_LINK} />;
	}

	return (
		<Switch>
			<UserDataContextProvider>
				<Route path={`${STUDENT_COURSES_LINK}/:id`}>
					<Course isProfessor={false} />
				</Route>
				{listOfItems.map(item => (
					<Route exact path={item.link} key={item.id}>
						{item.component}
					</Route>
				))}
			</UserDataContextProvider>

			{/* <Route path="*">
				<NotFound />
			</Route> */}
		</Switch>
	);
};

export default Student;
