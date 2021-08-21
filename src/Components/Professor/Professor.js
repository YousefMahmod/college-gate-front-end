import { useContext } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { PROFESSOR_MESSAGES_OVERVIEW_LINK } from "../../Constants";
import CourseContextProvider from "../../Contexts/CourseContext";
import { ItemsOfSideBarContext } from "../../Contexts/ItemsOfSideBarContext";

const Professor = () => {
	const { listOfItems } = useContext(ItemsOfSideBarContext);

	const location = useLocation();

	if (location.pathname === "/professor") {
		return <Redirect to={PROFESSOR_MESSAGES_OVERVIEW_LINK} />;
	}
	return (
		<Switch>
			<CourseContextProvider>
				{listOfItems.map(item => (
					<Route path={item.link} key={item.id} >
						<>{item.component}</>
					</Route>
				))}
			</CourseContextProvider>
		</Switch>
	);
};

export default Professor;
