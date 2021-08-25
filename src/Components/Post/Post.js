import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import UserPreview from "../UserPreview/UserPreview";
import styles from "./Post.module.css";

const Post = ({ post, course }) => {
	const { user } = useContext(AuthContext);
	console.log("post inside post", post);
	return (
		<div className={styles.post}>
			<UserPreview user={user} course={course} date={post.date} />
			<p>{post.content}</p>
			{/* <span className={styles.bar}></span> */}
		</div>
	);
};

export default Post;
