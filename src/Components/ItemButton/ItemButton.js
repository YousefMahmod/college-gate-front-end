import { Link, useLocation } from "react-router-dom";

const ItemButton = ({
	text,
	link,
	handleSidebarListClicked,
	isOriginalSideBar,
}) => {
	let className = "unActive";

	const location = useLocation();

	console.log(link);

	if (location.pathname.includes(link)) {
		className = "Active";
	}

	const messagesSidabar = () => (
		<Link to={link} className={className}>
			{text}
		</Link>
	);

	const originalSideBar = () => (
		<Link
			to={link}
			className={className}
			onClick={() => {
				handleSidebarListClicked(true);
			}}
		>
			{text}
		</Link>
	);
	return <li>{isOriginalSideBar ? originalSideBar() : messagesSidabar()}</li>;
};

export default ItemButton;
