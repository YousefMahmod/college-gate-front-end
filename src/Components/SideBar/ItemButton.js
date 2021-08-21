import { Link } from "react-router-dom";

const ItemButton = ({ text, link, state, handleSidebarListClicked }) => {
	let className = "unActive";
	if (state.includes(link)) {
		className = "Active";
	}
	return (
		<li>
			<Link
				to={link}
				className={className}
				onClick={() => {
					handleSidebarListClicked(true);
				}}
			>
				<span>{text}</span>
			</Link>
		</li>
	);
};

export default ItemButton;
