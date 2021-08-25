import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Contexts/UserDataContext";
import CourseButton from "./CourseButton";
import styles from "./Courses.module.css";
import CreateCourse from "./CreateCourse";
import CreateOrEnrollCourse from "./CreateOrEnrollCourse";

const Courses = ({ isProfessor }) => {
	const [showCreateCourseCard, setShowCreateCourseCard] = useState(false);
	const { courses, getCourses, waitCourses } = useContext(UserDataContext);

	const popupCreateCourseWindow = () => {
		setShowCreateCourseCard(true);
	};

	const closeCreateCourseCard = () => {
		setShowCreateCourseCard(false);
	};

	useEffect(() => {
		const abortFetch = new AbortController(); //هل هيتسمح من الميمورى ؟

		if (courses.length === 0) {
			getCourses(abortFetch);
		}

		return () => abortFetch.abort();
	}, []);

	const showProfessorCourses = () => {
		if (courses) {
			return (
				<div className={styles.courses}>
					{courses.map(course => (
						<CourseButton isProfessor={true} course={course} key={course.id} />
					))}

					{/* <CourseButton isCreateButton={true} isProfessor={true} course = {null}/> */}
					<CreateOrEnrollCourse
						isProfessor={true}
						popupCreateCourseWindow={popupCreateCourseWindow}
					/>
					{showCreateCourseCard && (
						<CreateCourse closeCreateCourseCard={closeCreateCourseCard} />
					)}
				</div>
			);
		} else if (!waitCourses) {
			return (
				<div className={styles.courses}>
					<CreateOrEnrollCourse
						isProfessor={true}
						popupCreateCourseWindow={popupCreateCourseWindow}
					/>
					{showCreateCourseCard && (
						<CreateCourse closeCreateCourseCard={closeCreateCourseCard} />
					)}
				</div>
			);
		}
	};

	const showStudentCourses = () => {};

	return (
		<div>
			{waitCourses && <div> Loading .....</div>}
			{isProfessor ? showProfessorCourses() : showStudentCourses()}
		</div>
	);
};

export default Courses;
