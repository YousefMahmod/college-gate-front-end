import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Student from "../Student/Student";
import { useState } from "react";
import ItemsOfSideBarContextProvider from "../../Contexts/ItemsOfSideBarContext";
import { Route, Switch } from "react-router-dom";
import Professor from "../Professor/Professor";
import Employee from "../Department/Employee";
import RedirectHandler from "../RedirectHandler/RedirectHandler";
// import { AuthContext } from "../../Contexts/AuthContext";
import styles from "./Account.module.css";

const Account = () => {
	const [showSidebar, setShowSidebar] = useState(false);

	const handleSidebarListClicked = stateSideBar => {
		if (stateSideBar) {
			setShowSidebar(false);
			return;
		}

		setShowSidebar(!showSidebar);
	};

	return (
		<div className={styles.account}>
			<RedirectHandler />

			<Header handleSidebarListClicked={handleSidebarListClicked} />

			<ItemsOfSideBarContextProvider>
				<SideBar
					showSidebar={showSidebar}
					handleSidebarListClicked={handleSidebarListClicked}
				/>

				<main
					
					onClick={() => {
						
						handleSidebarListClicked(true);
					}}
				>
					<Switch>
						<Route path="/student" component={Student} />

						<Route path="/professor" component={Professor} />

						<Route path="/department" component={Employee} />
					</Switch>
				</main>
			</ItemsOfSideBarContextProvider>
		</div>
	);
};

export default Account;
