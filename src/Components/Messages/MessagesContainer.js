import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageContext } from "../../Contexts/MessagesContext";
import styles from "./MessagesContainer.module.css";
const MessagesContainer = () => {
	const { sentMessages, recievedMessages, waitMessages } =
		useContext(MessageContext);

	const location = useLocation();

	useEffect(() => {
		if (location.pathname.includes("sent") && sentMessages.length === 0) {
			console.log("fetch Sent Messages");
		} else if (location.pathname.includes("recieved")) {
			console.log("fetch recieved messgaes");
		}
	}, []);

	return <div className={styles.messages_container}>MessagesContainer</div>;
};

export default MessagesContainer;
