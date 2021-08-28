import UserPreview from "../UserPreview/UserPreview";
import styles from "./CoursePreview.module.css";

const CoursePreview = ({ course, isProfessor }) => {
	const showProfessorCoursePreview = () => {
		return (
			<>
				<img src="https://picsum.photos/1200/600" alt="prof" />
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
			{/* {isProfessor ? showProfessorCoursePreview() : showStudentCoursePreview()} */}
			<img src="https://picsum.photos/1200/600" alt="prof" />

			<div>
				{!isProfessor && <span>Prof.{course.professor.name}</span>}
				<span>{course.name} course</span>
				{isProfessor && <span>Key: {course.key}</span>}
			</div>
		</div>
	);
};

export default CoursePreview;
