import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Contexts/UserDataContext";
import CourseButton from "./CourseButton";
import styles from "./Courses.module.css";
import CreateOrEnrollCourse from "./CreateOrEnrollCourse";

const Courses = ({ isProfessor }) => {
	const [showCreateOrEnrollCourseCard, setShowCreateOrEnrollCourseCard] =
		useState(false);
	const { courses, getCourses, waitCourses } = useContext(UserDataContext);

	const popupCreateOrEnrollCourseWindow = () => {
		setShowCreateOrEnrollCourseCard(true);
	};

	const closeCreateOrEnrollCourseCard = () => {
		setShowCreateOrEnrollCourseCard(false);
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
				<>
					{courses.map(course => (
						<CourseButton
							isProfessor={true}
							course={course}
							isCreateOrEnrollButton={false}
							key={course.id}
						/>
					))}
				</>
			);
		}
	};

	const showStudentCourses = () => {
		if (courses) {
			return (
				<>
					{courses.map(course => (
						<CourseButton
							isProfessor={false}
							course={course}
							isCreateOrEnrollButton={false}
							key={course.id}
						/>
					))}
				</>
			);
		}
	};

	return (
		<div className={styles.courses}>
			{waitCourses && <div> Loading .....</div>}
			{isProfessor ? showProfessorCourses() : showStudentCourses()}

			<CourseButton
				isProfessor={isProfessor}
				isCreateOrEnrollButton={true}
				popupCreateOrEnrollCourseWindow={popupCreateOrEnrollCourseWindow}
			/>

			{showCreateOrEnrollCourseCard && (
				<CreateOrEnrollCourse
					isPrfoessor={isProfessor}
					closeCreateOrEnrollCourseCard={closeCreateOrEnrollCourseCard}
				/>
			)}
		</div>
	);
};

export default Courses;
