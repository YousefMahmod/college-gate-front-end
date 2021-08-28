// import { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import UserPreview from "../UserPreview/UserPreview";
// import { CourseContext } from "../../Contexts/CourseContext";
import CoursePreview from "./CoursePreview";
import styles from "./Courses.module.css";

const CourseButton = ({
	isProfessor,
	isCreateOrEnrollButton,
	course,
	popupCreateOrEnrollCourseWindow,
}) => {
	const match = useRouteMatch();
	// const {handleCourseButtonClick} = useContext(CourseContext);

	const showStudentCourseBigButton = () => {
		if (isCreateOrEnrollButton) {
			return createOrEnrollCourseButton();
		}

		return studCoursePreviewButton();
	};

	const profCoursePreviewButton = () => {
		return (
			<Link to={`${match.path}/${course.id}`}>
				<div className={styles.course_preview_big_button}>
					<img
						src="https://picsum.photos/1200/600"
						alt="courseImage"
						className={styles.cover_img}
					/>
					<p> Name: {course.name} course</p>
					<p> key: {course.key} </p>
				</div>
			</Link>
		);
	};

	const studCoursePreviewButton = () => {
		return (
			<Link to={`${match.path}/${course.id}`}>
				<div className={styles.course_preview_big_button}>
					<img
						src="https://picsum.photos/1200/600"
						alt="courseImage"
						className={styles.cover_img}
					/>
					<UserPreview
						user={course.professor}
						course={course}
						date=""
						showOtherPreviewUser={true}
					/>
				</div>
			</Link>
		);
	};

	const createOrEnrollCourseButton = () => {
		return (
			<div
				className={styles.create_or_enroll_course_big_button}
				onClick={popupCreateOrEnrollCourseWindow}
				// onClick={popupCreateCourseWindow}
			>
				<img src="/Icons/plusIcon.svg" alt="" />

				{isProfessor ? <p>Create Course</p> : <p>Enroll Course</p>}
			</div>
		);
	};

	const showProfessorCourseBigButton = () => {
		if (isCreateOrEnrollButton) {
			return createOrEnrollCourseButton();
		}

		return profCoursePreviewButton();
	};

	return (
		<div className={styles.course_big_button}>
			{isProfessor
				? showProfessorCourseBigButton()
				: showStudentCourseBigButton()}
		</div>
	);
};

export default CourseButton;
