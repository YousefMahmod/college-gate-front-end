import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import UserPreview from "../UserPreview/UserPreview";
import styles from "./Post.module.css";

const Post = ({ post, course }) => {
	// const { user } = useContext(AuthContext);
	console.log("post inside post", post);
	return (
		<div className={styles.post}>
			<div className={styles.post_user_preview}>
				<UserPreview
					user={course.professor}
					course={course}
					date={post.date}
					showOtherPreviewUser={true}
				/>
			</div>
			<p>{post.content}</p>
			{/* <span className={styles.bar}></span> */}
		</div>
	);
};

export default Post;
