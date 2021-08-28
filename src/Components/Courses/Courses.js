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

	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				width: "100%",
				height: "100%",
			}}
		>
			<div className={styles.courses}>
				{waitCourses && <div> Loading .....</div>}
				{/* {isProfessor ? showProfessorCourses() : showStudentCourses()} */}
				{courses && (
					<>
						{courses.map(course => (
							<CourseButton
								isProfessor={isProfessor}
								course={course}
								isCreateOrEnrollButton={false}
								key={course.id}
							/>
						))}{" "}
					</>
				)}
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
		</div>
	);
};

export default Courses;
