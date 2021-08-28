import { useContext } from "react";
import {
	Redirect,
	Route,
	Switch,
	useLocation,
	useRouteMatch,
} from "react-router-dom";
import {
	PROFESSOR_COURSES_LINK,
	PROFESSOR_MESSAGES_OVERVIEW_LINK,
} from "../../Constants";
import UserDataContextProvider from "../../Contexts/UserDataContext";
import { ItemsOfSideBarContext } from "../../Contexts/ItemsOfSideBarContext";
import Course from "../Courses/Course";

const Professor = () => {
	const { listOfItems } = useContext(ItemsOfSideBarContext);

	const location = useLocation();
	const match = useRouteMatch();

	if (location.pathname === "/professor") {
		return <Redirect to={PROFESSOR_MESSAGES_OVERVIEW_LINK} />;
	}
	return (
		<Switch>
			<UserDataContextProvider>
				<Route path={`${PROFESSOR_COURSES_LINK}/:id`}>
					<Course isProfessor={true} />
				</Route>

				{listOfItems.map(item => (
					<Route exact path={item.link} key={item.id}>
						{item.component}
					</Route>
				))}
			</UserDataContextProvider>
		</Switch>
	);
};

export default Professor;
