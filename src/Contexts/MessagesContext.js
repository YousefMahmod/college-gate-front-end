import { createContext, useContext, useState } from "react";
import { createMessage, fetchListOfStudents } from "../API/apiRequestes";
import CreateMessage from "../Components/Messages/CreateMessage";
import MessagesContainer from "../Components/Messages/MessagesContainer";
import { PROFESSOR_COURSES_LINK, STUDENT_COURSES_LINK } from "../Constants";
import { AuthContext } from "./AuthContext";
import { UserDataContext } from "./UserDataContext";

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
	//##################### Message States #######################

	const [finishSendingMessage, setFinishSendingMessage] = useState(false);
	const [sentMessages, setSentMessages] = useState([]);
	const [recievedMessages, setRecievedMessages] = useState([]);
	const [waitMeesages, setWaitMeesages] = useState(true);

	const { course } = useContext(UserDataContext);
	const { user } = useContext(AuthContext);

	//########################### messages #####################
	const handleFinishSendingMessage = () => {
		setFinishSendingMessage(false);
	};

	//####################Variables################################
	let messageSidebarItems = [];
	let relativePath = "";
	const isProfessor = user.type === "Professor" ? true : false;

	if (isProfessor && course) {
		relativePath = `${PROFESSOR_COURSES_LINK}/${course.id}`;
	} else if (course) {
		relativePath = `${STUDENT_COURSES_LINK}/${course.id}`;
	}

	if (course) {
		messageSidebarItems = [
			{
				id: 1,
				text: "Received",
				link: `${relativePath}/messages/recieved`,
				path: [`${relativePath}/messages`, `${relativePath}/messages/recieved`],
				component: <MessagesContainer />,
			},
			{
				id: 2,
				text: "Sent",
				link: `${relativePath}/messages/sent`,
				path: `${relativePath}/messages/sent`,
				component: <MessagesContainer />,
			},
			{
				id: 3,
				text: "Send a message",
				link: `${relativePath}/messages/sendmessage`,
				path: `${relativePath}/messages/sendmessage`,
				component: <CreateMessage isProfessor={isProfessor} />,
			},
		];
	}

	const sendMessage = (...args) => {
		return createMessage(args)
			.then(({ data, res }) => {
				setFinishSendingMessage(true);
				console.log("data", data);

				if (res.ok) {
					setSentMessages([...sentMessages, data.items]);
					return { data, res };
				}

				return { data, res };
			})
			.catch(err => {
				if (err.name === "AbortError") {
					console.log("Abort fetch");
				} else {
					console.log(err);
				}
			});
	};

	return (
		<MessageContext.Provider
			value={{
				messageSidebarItems,
				sendMessage,
				handleFinishSendingMessage,
				finishSendingMessage,
				sentMessages,
				recievedMessages,
				waitMeesages,
			}}
		>
			{children}
		</MessageContext.Provider>
	);
};

export default MessageContextProvider;
