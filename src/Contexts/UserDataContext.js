import { createContext, useContext, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	createCourse,
	createMessage,
	createPost,
	enrollCourse,
	fetchCourse,
	fetchCourses,
	fetchListOfPosts,
	fetchListOfStudents,
} from "../API/apiRequestes";
import CreateMessage from "../Components/Messages/CreateMessage";
import Messages from "../Components/Messages/Messages";
import MessagesContainer from "../Components/Messages/MessagesContainer";
import Announcements from "../Components/Announcements/Announcements";
import { PROFESSOR_COURSES_LINK, STUDENT_COURSES_LINK } from "../Constants";
import { courseReducer } from "../Reducers/CourseReducer";
import { AuthContext } from "./AuthContext";
import MessageContextProvider from "./MessagesContext";

export const UserDataContext = createContext();

// course state dispatch get a certain course or create
// courses state get all courses

const UserDataContextProvider = ({ children }) => {
	//if you change one of state the other still keeping its data not the default

	// const [course, dispatch] = useReducer(courseReducer, {});
	//courses content

	const { user } = useContext(AuthContext);
	const location = useLocation();

	//##################### Course States #######################
	const [course, setCourse] = useState(null);
	const [waitCourse, setWaitCourse] = useState(true);
	const [courseNotFound, setCourseNotFound] = useState(false);
	const [courses, setCourses] = useState([]);
	const [waitCourses, setWaitCourses] = useState(true);

	//##################### Post States #######################
	const [posts, setPosts] = useState([]);
	const [waitPosts, setWaitPosts] = useState(true);
	const [hasMore, setHasMore] = useState(true);

	//##################### Message States #######################

	//##################### StudentList States #######################
	const [students, setStudents] = useState([]);
	const [waitStudentList, setWaitStudentList] = useState(true);
	// const [finishSendingMessage, setFinishSendingMessage] = useState(false);

	//##################### Variables #######################
	let courseTabs = {};
	// let messageSidebarItems = [];
	let relativePath = "";
	let tabsTextList = [];
	const isProfessor = user.type === "Professor" ? true : false;

	if (isProfessor && course) {
		relativePath = `${PROFESSOR_COURSES_LINK}/${course.id}`;
		tabsTextList = ["Announcements", "Quizzes"];
	} else if (course) {
		relativePath = `${STUDENT_COURSES_LINK}/${course.id}`;
		tabsTextList = ["Feed", "Grades"];
	}

	if (course) {
		// messageSidebarItems = [
		// 	{
		// 		id: 1,
		// 		text: "Received",
		// 		link: `${relativePath}/messages/recieved`,
		// 		path: [`${relativePath}/messages`, `${relativePath}/messages/recieved`],
		// 		component: <MessagesContainer />,
		// 	},
		// 	{
		// 		id: 2,
		// 		text: "Sent",
		// 		link: `${relativePath}/messages/sent`,
		// 		path: `${relativePath}/messages/sent`,
		// 		component: <MessagesContainer />,
		// 	},
		// 	{
		// 		id: 3,
		// 		text: "Send a message",
		// 		link: `${relativePath}/messages/sendmessage`,
		// 		path: `${relativePath}/messages/sendmessage`,
		// 		component: <CreateMessage isProfessor={isProfessor} />,
		// 	},
		// ];

		courseTabs = [
			{
				id: 1,
				text: tabsTextList[0],
				link: `${relativePath}/${tabsTextList[0].toLowerCase()}`,
				path: [
					`${relativePath}`,
					`${relativePath}/${tabsTextList[0].toLowerCase()}`,
				],
				isActive:
					location.pathname.includes(tabsTextList[0].toLowerCase()) ||
					location.pathname === `${relativePath}`,
				component: <Announcements isProfessor={isProfessor} />,
			},
			{
				id: 2,
				text: tabsTextList[1],
				link: `${relativePath}/${tabsTextList[1].toLowerCase()}`,
				path: `${relativePath}/${tabsTextList[1].toLowerCase()}`,
				isActive: location.pathname.includes(tabsTextList[1].toLowerCase()),
			},
			{
				id: 3,
				text: "Messages",
				link: `${relativePath}/messages`,
				path: [
					`${relativePath}/messages`,
					`${relativePath}/messages/recieved`,
					`${relativePath}/messages/sent`,
					`${relativePath}/messages/sendmessage`,
				],
				isActive: location.pathname.includes("messages"),
				component: (
					<MessageContextProvider>
						<Messages />
					</MessageContextProvider>
				),
			},
		];
	}

	//functions
	//########################### courses #####################
	const handleCourseState = course => {
		setCourse(course);
	};

	const handleWaitCourse = () => {
		setWaitCourse(false);
	};

	const handleCourseNotFound = () => {
		setCourseNotFound(false);
	};

	const addCourse = (newCourse, abortConst) => {
		return createCourse(newCourse, abortConst)
			.then(({ data, res }) => {
				console.log(data, res);
				if (res.ok) {
					setCourses([...courses, data]);

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

	const enrollOnCourse = (key, abort) => {
		return enrollCourse(key, abort)
			.then(({ data, res }) => {
				console.log(data, res);
				if (res.ok) {
					setCourses([...courses, data]);

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

	//########################### posts #####################
	const handleWaitPosts = () => {
		setWaitPosts(true);
	};

	const handleHasMoreForPosts = () => {
		setHasMore(true);
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

	//########################### messages #####################

	//########################### StudentList #####################
	// const handleFinishSendingMessage = () => {
	// 	setFinishSendingMessage(false);
	// };

	const getStudentList = (...args) => {
		fetchListOfStudents(args)
			.then(({ data, res }) => {
				setWaitStudentList(false);

				if (res.ok) {
					console.log("data", data);
					setStudents(data.items);
					return;
				}

				console.log(data.message, data.status);
			})
			.catch(err => {
				if (err.name === "AbortError") {
					console.log("Abort fetch");
				} else {
					console.log(err);
				}
			});
	};

	// const sendMessage = (...args) => {
	// 	return createMessage(args)
	// 		.then(({ data, res }) => {
	// 			setFinishSendingMessage(true);
	// 			console.log("data", data);

	// 			if (res.ok) {
	// 				// setPosts([...posts, data]);

	// 				return { data, res };
	// 			}

	// 			return { data, res };
	// 		})
	// 		.catch(err => {
	// 			if (err.name === "AbortError") {
	// 				console.log("Abort fetch");
	// 			} else {
	// 				console.log(err);
	// 			}
	// 		});
	// };

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
				enrollOnCourse,
				getCourse,
				getCourses,
				posts,
				waitPosts,
				handleWaitPosts,
				handleHasMoreForPosts,
				hasMore,
				addPost,
				getPosts,
				// messageSidebarItems,
				students,
				waitStudentList,
				// finishSendingMessage,
				getStudentList,
				// sendMessage,
				// handleFinishSendingMessage,
			}}
		>
			{children}
		</UserDataContext.Provider>
	);
};

export default UserDataContextProvider;
