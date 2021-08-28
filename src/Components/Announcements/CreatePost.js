import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Contexts/UserDataContext";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
	const [postContent, setPostContent] = useState("");
	const { course, addPost } = useContext(UserDataContext);
	const [createPostError, setCreatePostError] = useState(false);
	const [waitCreatePost, setWaitCreatePost] = useState(false);

	let submitPostDisplay = "submit_active_button";

	// console.log("course", course);
	// console.log("createPostError", createPostError);
	// console.log("waitCreatePost", waitCreatePost);
	const abort = new AbortController();

	const handleSubmitPost = e => {
		e.preventDefault();

		setWaitCreatePost(true);
	};

	useEffect(() => {
		console.log("INSIDE CREATE USE EFFECT");

		if (waitCreatePost) {
			const newPost = {
				content: postContent,
			};

			addPost(newPost, course.id, abort)
				.then(({ data, res }) => {
					setWaitCreatePost(false);
					setPostContent("");

					if (res.ok) {
						setCreatePostError(false);
						return;
					}
					setCreatePostError(data.message);
				})
				.catch(err => {
					setCreatePostError(false);
					if (err.name === "AbortError") {
						console.log("Abort fetch");
					} else {
						console.log(err);
					}
				});
		}
		return () => abort.abort();
	}, [waitCreatePost]);
	// useEffect(() => {
	// 	return () => abort.abort();
	// });
	if (waitCreatePost) {
		submitPostDisplay = "submit_not_active_button";
	}
	return (
		<div className={styles.create_post}>
			<form onSubmit={e => handleSubmitPost(e)}>
				<textarea
					required
					placeholder="Post Content"
					cols="200"
					rows="10"
					value={postContent}
					onChange={e => {
						setPostContent(e.target.value);
					}}
					maxLength="800"
				></textarea>
				<div style={{ textAlign: "right", marginTop: "10px" }}>
					<input
						type="submit"
						value="post"
						className={`submit_button ${submitPostDisplay}`}
					/>

					{createPostError && (
						<span className="err_message">{createPostError}</span>
					)}
				</div>
			</form>
		</div>
	);
};

export default CreatePost;
