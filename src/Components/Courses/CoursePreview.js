import UserPreview from "../UserPreview/UserPreview";
import styles from "./CoursePreview.module.css";

const CoursePreview = ({ course, isProfessor }) => {
	const showProfessorCoursePreview = () => {
		return (
			<>
				<p> {course.name} course</p>
				<p> Key: {course.key} </p>
			</>
		);
	};

	const showStudentCoursePreview = () => {
		return (
			<>
				<UserPreview
					user={course.professor}
					course={course}
					date=""
					showOtherPreviewUser={true}
				/>
			</>
		);
	};

	return (
		<div className={styles.course_preview}>
			{isProfessor ? showProfessorCoursePreview() : showStudentCoursePreview()}
		</div>
	);
};

export default CoursePreview;
