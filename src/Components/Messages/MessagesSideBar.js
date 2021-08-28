import { useContext } from "react";
import { ItemsOfSideBarContext } from "../../Contexts/ItemsOfSideBarContext";
import { MessageContext } from "../../Contexts/MessagesContext";
import { UserDataContext } from "../../Contexts/UserDataContext";
import ItemButton from "../ItemButton/ItemButton";
import styles from "./MessagesSideBar.module.css";

const MessagesSideBar = () => {
	const { messageSidebarItems } = useContext(MessageContext);

	return (
		<div className={styles.messages_sidebar}>
			{/* <Profile user={user} /> */}
			<ul>
				{messageSidebarItems.map((item, index) => (
					<ItemButton
						text={item.text}
						link={item.link}
						key={item.id}
						isOriginalSideBar={false}
						// handleSidebarListClicked={handleSidebarListClicked}
					/>
				))}
			</ul>
		</div>
	);
};

export default MessagesSideBar;
