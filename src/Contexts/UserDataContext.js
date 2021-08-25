import { createContext, useContext, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	createCourse,
	createPost,
	fetchCourse,
	fetchCourses,
	fetchListOfPosts,
} from "../API/apiRequestes";
import Announcements from "../Components/Post/Announcements";
import { PROFESSOR_COURSES_LINK } from "../Constants";
import { courseReducer } from "../Reducers/CourseReducer";
import { AuthContext } from "./AuthContext";

export const UserDataContext = createContext();

// course state dispatch get a certain course or create
// courses state get all courses

const UserDataContextProvider = ({ children }) => {
	//if you change one of state the other still keeping its data not the default

	// const [course, dispatch] = useReducer(courseReducer, {});
	//courses content
	const [course, setCourse] = useState(null);
	const [waitCourse, setWaitCourse] = useState(true);
	const [courseNotFound, setCourseNotFound] = useState(false);
	const [courses, setCourses] = useState([]);
	const [waitCourses, setWaitCourses] = useState(true);

	//posts content
	// const [post, setPost] = useState(null);
	const [posts, setPosts] = useState([]);
	const [waitPosts, setWaitPosts] = useState(true);
	const [hasMore, setHasMore] = useState(true);

	console.log("posts state", posts);
	console.log("waitPosts state", waitPosts);

	const { user } = useContext(AuthContext);

	const location = useLocation();

	let courseTabs = {};

	if (user.type === "Professor" && course) {
		courseTabs = [
			{
				text: "Announcements",
				link: `${PROFESSOR_COURSES_LINK}/${course.id}/announcements`,
				path: [
					`${PROFESSOR_COURSES_LINK}/${course.id}`,
					`${PROFESSOR_COURSES_LINK}/${course.id}/announcements`,
				],
				id: 1,
				isActive:
					location.pathname.includes("announcements") ||
					location.pathname === `${PROFESSOR_COURSES_LINK}/${course.id}`,
				component: <Announcements />,
			},
			{
				text: "Quizzes",
				link: `${PROFESSOR_COURSES_LINK}/${course.id}/quizzes`,
				path: `${PROFESSOR_COURSES_LINK}/${course.id}/quizzes`,
				id: 2,
				isActive: location.pathname.includes("quizzes"),
			},
			{
				text: "Messages",
				link: `${PROFESSOR_COURSES_LINK}/${course.id}/messages`,
				path: `${PROFESSOR_COURSES_LINK}/${course.id}/messages`,
				id: 3,
				isActive: location.pathname.includes("messages"),
			},
		];
	} else if (course) {
		courseTabs = [
			{
				text: "Announcements",
				link: `${PROFESSOR_COURSES_LINK}/${course.id}/announcemetns`,
			},
			{
				text: "Quizzes",
				link: `${PROFESSOR_COURSES_LINK}/${course.id}/quizzes`,
			},
			{
				text: "Messages",
				link: `${PROFESSOR_COURSES_LINK}/${course.id}/messages`,
			},
		];
		console.log("Student");
	}
	//functions

	const handleCourseState = course => {
		setCourse(course);
	};

	const handleWaitCourse = () => {
		setWaitCourse(false);
	};

	const handleCourseNotFound = () => {
		setCourseNotFound(false);
	};

	const handleWaitPosts = () => {
		setWaitPosts(true);
	};

	const handleHasMoreForPosts = () => {
		setHasMore(true);
	};

	const addCourse = newCourse => {
		return createCourse(newCourse)
			.then(({ data, res }) => {
				if (res.ok) {
					setCourses([...courses, data]);

					return { data, res };
				}

				return { data, res };
			})
			.catch(err => {
				console.log(err);
			});
	};

	const getCourses = abort => {
		fetchCourses(abort)
			.then(({ data, res }) => {
				setWaitCourses(false);
				if (res.ok) {
					setCourses(data.items);
					return;
				}
				console.log(data.message, data.status);
				setCourses([]);
			})
			.catch(err => {
				if (err.name === "AbortError") {
					console.log("Abort fetch");
				} else {
					console.log(err);
				}
			});
	};

	const getCourse = (abort, id) => {
		fetchCourse(abort, id)
			.then(({ data, res }) => {
				setWaitCourse(false);

				if (res.ok) {
					setCourse(data);
					setCourseNotFound(false);
					return;
				}
				console.log(data.message, data.status);
				setCourse(null);
				setCourseNotFound(true);
			})
			.catch(err => {
				if (err.name === "AbortError") {
					console.log("Abort fetch");
				} else {
					console.log(err);
				}
			});
	};

	const addPost = (...args) => {
		// newpost, id, abort
		return createPost(args)
			.then(({ data, res }) => {
				console.log("data", data);
				console.log("res", res);

				if (res.ok) {
					setPosts([...posts, data]);

					return { data, res };
				}

				return { data, res };
			})
			.catch(err => {
				if (err.name === "AbortError") {
					console.log("Abort fetch");
				} else {
					console.log(err);
				}
			});
	};

	const getPosts = (...args) => {
		fetchListOfPosts(args)
			.then(({ data, res }) => {
				setWaitPosts(false);

				if (res.ok) {
					console.log("data", data);
					setPosts([...posts, ...data.items]);
					return;
				}
				setHasMore(false);
				// setPosts([]);
				console.log(data.message, data.status);
			})
			.catch(err => {
				setWaitPosts(false);
				// setHasMore(false);

				if (err.name === "AbortError") {
					console.log("Abort fetch");
				} else {
					console.log(err);
				}
			});
	};

	return (
		<UserDataContext.Provider
			value={{
				course,
				handleCourseState,
				waitCourse,
				handleWaitCourse,
				courseNotFound,
				handleCourseNotFound,
				courseTabs,
				courses,
				waitCourses,
				addCourse,
				getCourse,
				getCourses,
				posts,
				waitPosts,
				handleWaitPosts,
				handleHasMoreForPosts,
				hasMore,
				addPost,
				getPosts,
			}}
		>
			{children}
		</UserDataContext.Provider>
	);
};

export default UserDataContextProvider;
