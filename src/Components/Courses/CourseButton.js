// import { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
// import { CourseContext } from "../../Contexts/CourseContext";
import CoursePreview from "./CoursePreview";
import styles from "./Courses.module.css";

const CourseButton = ({ isProfessor, course }) => {
	
	const match = useRouteMatch();
	// const {handleCourseButtonClick} = useContext(CourseContext);

	const showStudentCourse = () => {};

	const showProfessorCourse = () => {
		return (
			<div className={styles.prof_course_preview_button}>
				<img 
                    src="https://picsum.photos/1200/600" 
                    alt="courseImage" 
                />
                <p> Name: {course.name} course</p>
                <p> key: {course.key} </p>
			</div>
		);
	};

	return (
		<div className={styles.course_button}>
			<Link
				to={`${match.path}/${course.id}`}
			>
				{isProfessor ? showProfessorCourse() : showStudentCourse()}
			</Link>
		</div>
	);
};

export default CourseButton;
