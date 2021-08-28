import { useContext } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { PROFESSOR_COURSES_LINK, STUDENT_COURSES_LINK } from "../../Constants";
import { ItemsOfSideBarContext } from "../../Contexts/ItemsOfSideBarContext";
import { MessageContext } from "../../Contexts/MessagesContext";
import { UserDataContext } from "../../Contexts/UserDataContext";
import styles from "./Messages.module.css";
import MessagesContainer from "./MessagesContainer";
import MessagesSideBar from "./MessagesSideBar";

const Messages = () => {
	// const { messageSidebarItems, course } = useContext(UserDataContext);
	const { course } = useContext(UserDataContext);
	const { messageSidebarItems } = useContext(MessageContext);

	const location = useLocation();

	if (location.pathname === `${PROFESSOR_COURSES_LINK}/${course.id}/messages`) {
		return (
			<Redirect
				to={`${PROFESSOR_COURSES_LINK}/${course.id}/messages/recieved`}
			/>
		);
	}
	if (location.pathname === `${STUDENT_COURSES_LINK}/${course.id}/messages`) {
		return (
			<Redirect to={`${STUDENT_COURSES_LINK}/${course.id}/messages/recieved`} />
		);
	}

	return (
		<div className={styles.messages}>
			<MessagesSideBar />

			{messageSidebarItems.map(item => (
				<Route exact path={item.path} key={item.id}>
					{item.component}
				</Route>
			))}
		</div>
	);
};

export default Messages;
