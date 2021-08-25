import styles from "./CoursePreview.module.css";

const CoursePreview = ({ course, isProfessor }) => {
	const showProfessorCoursePreview = () => {
		return (
			<div className={styles.course_preview}>
				<div className={styles.course_content}>
					<p> {course.name} course</p>
					<p> Key: {course.key} </p>
				</div>
			</div>
		);
	};

	const showStudentCoursePreview = () => {};

	return (
		<div>
			{isProfessor ? showProfessorCoursePreview() : showStudentCoursePreview()}
		</div>
	);
};

export default CoursePreview;
