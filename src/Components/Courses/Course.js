import { useContext, useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import { UserDataContext } from "../../Contexts/UserDataContext";
import Tab from "../Tab/Tab";
import styles from "./Course.module.css";
import CoverCourse from "./CoverCourse";

const Course = ({ isProfessor }) => {
	let coursePreview = {};

	const {
		getCourse,
		waitCourse,
		handleWaitCourse,
		course,
		handleCourseState,
		courseNotFound,
		handleCourseNotFound,
		courses,
		courseTabs,
	} = useContext(UserDataContext);

	const params = useParams();
	console.log(course);
	console.log(courseTabs);
	useEffect(() => {
		if (courses.length !== 0) {
			let course = courses.find(course => {
				return course.id === params.id;
			});

			// if (typeof course === "undefined") {
			// 	handleCourseState(null);
			// 	handleWaitCourse();
			// 	handleCourseNotFound();
			// 	return;
			// 	// return <Redirect to="/NotFound" />
			// }
			handleCourseState(course);
			handleWaitCourse();
			handleCourseNotFound();
		} else {
			//fetch

			const abort = new AbortController();

			getCourse(abort, params.id);
			return () => {
				abort.abort();
			};
		}
	}, []);

	return (
		<section className={styles.course_container}>
			{waitCourse && <div>Loading.....</div>}
			{course && (
				<div style={{ width: "100%" }}>
					<CoverCourse isProfessor={isProfessor} />

					<ul className={styles.course_tabs}>
						{courseTabs.map(item => (
							<Tab item={item} key={item.id} />
						))}
					</ul>

					{courseTabs.map(item => (
						<Route exact path={item.path} key={item.id}>
							{item.component}
						</Route>
					))}
				</div>
			)}
			{courseNotFound && <div> Course Not Found</div>}

			{/* <Route path={NOT_FOUND} component={NotFound}/> */}
		</section>
	);
};

export default Course;
