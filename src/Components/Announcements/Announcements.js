import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Contexts/UserDataContext";
import styles from "./Announcements.module.css";
import CreatePost from "./CreatePost";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";

const Announcements = ({ isProfessor }) => {
	let {
		posts,
		waitPosts,
		getPosts,
		course,
		hasMore,
		handleWaitPosts,
		handleHasMoreForPosts,
	} = useContext(UserDataContext);

	// console.log("course", course);
	console.log("posts", posts);
	console.log("hasMore", hasMore);
	// const [fetchMore, setFetchMore] = useState(false);
	// const [scrollY, setScrollY] = useState(window.scrollY);
	// handle cache of posts for each course
	if (posts.length !== 0 && posts[0].course.id !== course.id) {
		waitPosts = true;
		posts.length = 0;
	}
	// console.log("scrollY", scrollY);

	useEffect(() => {
		console.log("INSIDE EFFCT OF ANNOUNCEMENTS");

		const abortCons = new AbortController();

		if (posts.length === 0 || posts[0].course.id !== course.id) {
			getPosts(course.id, 0, abortCons);
		}

		return () => {
			handleHasMoreForPosts();
			abortCons.abort();
		};
	}, []);

	const fetchMorePosts = () => {
		console.log("go to fetch");
		const abortCons = new AbortController();

		getPosts(course.id, posts.length, abortCons);

		return () => abortCons.abort();
	};
	// useEffect(() => {

	// 	console.log("INSIDE EFFCT OF ANNOUNCEMENTS");

	// 	const abortCons = new AbortController();

	// 	fetchMorePosts(abortCons);

	// 	return () => abortCons.abort();

	// }, [fetchMorePosts])

	// useEffect(() => {
	// 	console.log("INSIDE EFFCT TO TEST SCROLL");

	// 	const handleScrollWindow = () => {
	// 		setScrollY(window.scrollY);
	// 		// console.log("ScrollY", window.scrollY, "ScrollX", window.scrollX);
	// 	};

	// 	window.addEventListener("scroll", handleScrollWindow);

	// 	return _ => {
	// 		window.removeEventListener("scroll", handleScrollWindow);
	// 	};
	// });

	return (
		<div className={styles.posts_container}>
			{isProfessor && <CreatePost />}

			{/* {waitPosts && <div>Loading....</div>} */}

			<InfiniteScroll
				dataLength={posts.length}
				next={fetchMorePosts}
				hasMore={hasMore}
				// height={400}
				// scrollableTarget="scrollDiv"
				loader={<div>Loadding</div>}
			>
				{posts &&
					posts.map(post => <Post post={post} course={course} key={post.id} />)}
			</InfiniteScroll>

			{/* {posts &&
				posts.map((post, index) => (
					<Post post={post} course={course} key={post.id} />
				))} */}

			{/* <Post
				post={{ date: "date", content: "sadgasdgasdfgasdga" }}
				course={course}
			/> */}
		</div>
	);
};

export default Announcements;
