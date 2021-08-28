import { Link } from "react-router-dom";
import styles from "./Tab.module.css";
const Tab = ({ item }) => {
	let tabState = styles.not_active_tab;

	if (item.isActive) {
		tabState = styles.active_tab;
	}
	return (
		<li className={`${tabState} ${styles.tab}`}>
			<Link to={item.link} className="center_flex">
				<img src="/logo192.png" alt="logo" />
				<span>{item.text}</span>
			</Link>
		</li>
	);
};

export default Tab;
