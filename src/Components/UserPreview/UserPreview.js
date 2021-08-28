import styles from "./UserPreview.module.css";

const UserPreview = ({ user, showOtherPreviewUser, course, date }) => {
	const myUserpreview = () => {
		return (
			<div style={{ width: "100%", height: "100%" }}>
				<img src="https://picsum.photos/1200/600" alt="User" />

				<div>
					{user.type === "Professor" && <span>Prof.{user.name}</span>}
					{user.type !== "Professor" && <span>{user.name}</span>}
					{user.type !== "Department" && <span>{course.name} course</span>}
				</div>
			</div>
		);
	};

	const otherUserPreview = () => {
		return (
			// <div style={{ width: "100%", height: "100%" }}>
			<>
				<img src="https://picsum.photos/1200/600" alt="User" />
				<div>
					{user.type === "Professor" && <span>Prof.{user.name}</span>}
					{user.type !== "Professor" && <span>{user.name}</span>}
					{user.type !== "Department" && <span>{course.name} course</span>}
					<span className={styles.date}>{date}</span>
				</div>
			</>
			// </div>
		);
	};
	return (
		<div className={styles.user_preview}>
			{showOtherPreviewUser ? otherUserPreview() : myUserpreview()}
		</div>
	);
};

export default UserPreview;
