import { useContext } from "react";
import { useHistory } from "react-router";
import { LOGIN_LINK } from "../../Constants";
import { AuthContext } from "../../Contexts/AuthContext";
import styles from "./Header.module.css";

const Header = ({ handleSidebarListClicked }) => {
	const history = useHistory();

	const { handlerSignOut } = useContext(AuthContext);

	const signOut = () => {
		history.replace({ pathname: LOGIN_LINK });

		handlerSignOut();
	};

	return (
		<div className={styles.header}>
			<img
				src="/Icons/list.svg"
				alt="sideBarList"
				className={styles.list_view}
				onClick={() => handleSidebarListClicked(false)}
			/>

			<h1>College Gate</h1>

			<img
				src="/Icons/sign-out-alt-solid.svg"
				alt="signOut"
				onClick={signOut}
			/>
		</div>
	);
};

export default Header;
