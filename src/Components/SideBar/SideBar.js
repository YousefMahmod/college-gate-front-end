import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ItemsOfSideBarContext } from "../../Contexts/ItemsOfSideBarContext";
import ItemButton from "./ItemButton";
// import Profile from "../Profile/Profile";
// import { AuthContext } from "../../Contexts/AuthContext";
import styles from "./SideBar.module.css";

const SideBar = ({ showSidebar, handleSidebarListClicked }) => {

	const { listOfItems } = useContext(ItemsOfSideBarContext);
	const location = useLocation();
	// const user = useContext(AuthContext);
	let sidebarDisplayStyle = styles.disable_sidebar;

	if (showSidebar) {
		sidebarDisplayStyle = styles.active_sidebar;
	}

	return (
		<div className={`${styles.sidebar} ${sidebarDisplayStyle}`}>
			{/* <Profile user={user} /> */}
			<ul>
				{listOfItems.map(item => (
					<ItemButton
						text={item.text}
						link={item.link}
						state={location.pathname}
						key={item.id}
                        handleSidebarListClicked={handleSidebarListClicked}
					/>
				))}
			</ul>
		</div>
	);
};

export default SideBar;
