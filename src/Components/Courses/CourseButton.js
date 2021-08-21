import { Link, useRouteMatch } from "react-router-dom";
import CoursePreview from "./CoursePreview";
import styles from "./Courses.module.css";

const CourseButton = ({ isProfessor, course }) => {
	// const [style, setStyle] = useState(styles.create_course);
	// const [showCreateCourseCard, setShowCreateCourseCard] = useState(false);
	const match = useRouteMatch();

	// const popupCreateCourseWindow = () => {

	//     setShowCreateCourseCard(true);

	// }

	// const handleCloseButton = () => {

	//     console.log("handleCloseButton called");
	//     setShowCreateCourseCard(false);

	// }

	// const closeCreateCourseCard = () => {

	//     console.log("closeCreateCourseCard called");
	//     setShowCreateCourseCard(false);
	//     // setStyle(styles.create_course);

	// }
	const showStudentCourse = () => {};

	const showProfessorCourse = () => {
		return (
			<div>
				<CoursePreview course={course} isProfessor={isProfessor} />
			</div>
		);
	};
	// const goToCourseComp = () => {

	//     return <Redirect to={`${PROFESSOR_COURSE_LINK}/${course.id}`} />

	// }

	return (
		<div className={styles.course_button}>
			<Link to={`${match.path}/${course.name}`}>
				{isProfessor ? showProfessorCourse() : showStudentCourse()}
			</Link>
		</div>
	);
};

export default CourseButton;
