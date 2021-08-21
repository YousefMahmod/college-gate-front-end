import { useContext, useState } from "react";
import { CourseContext } from "../../Contexts/CourseContext";
// import styles from './CreateCourse.module.css';
import styles from "./Courses.module.css";

const CreateCourse = ({ closeCreateCourseCard }) => {
	// const {dispatch} = useContext(CourseContext);

	//const {addCourse, fetchError, isPending, setIsPending} = useContext(CourseContext);
	const { addCourse } = useContext(CourseContext);
	const [waitCreateCourse, setWaitCreateCourse] = useState(false);
	const [createCourseError, setCreateCourseError] = useState("");

	// console.log("isPending", isPending);
	// console.log("fetchError", fetchError);

	// useEffect(() => {

	//     console.log("useEffect Called");
	//     setIsPending(true);
	// }, []);

	const [name, setName] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		const course = {
			name,
		};

		setWaitCreateCourse(true);

		addCourse(course).then(({ data, res }) => {
			if (res.ok) {
				setWaitCreateCourse(false);
				setCreateCourseError("");
				closeCreateCourseCard();
			} else {
				setWaitCreateCourse(false);
				setCreateCourseError(data.message);
			}
		});

		console.log("I can't wait");
	};

	const handleCloseCourseCard = close => {
		console.log("close", close);
		console.log("handleCloseCourseCard called");
		if (!waitCreateCourse && close) {
			closeCreateCourseCard();
		}
		// closeCreateCourseCard();
	};

	// if(!isPending){

	//     closeCreateCourseCard();
	// }

	return (
		<div
			className={` ${styles.container_create_course_card}`}
			// onClick={() => handleCloseCourseCard(true)}
		>
			<div
				className={` ${styles.create_course_card}`}
				// onClick={() => handleCloseCourseCard(false)}
			>
				<div className={styles.create_course_header}>
					<h2>Create Course</h2>
					<img
						src="/Icons/closeButton.svg"
						alt="close"
						onClick={() => handleCloseCourseCard(true)}
					/>
				</div>
				<form onSubmit={e => handleSubmit(e)}>
					<label htmlFor="course_name">Enter Course Name</label>

					<input
						type="text"
						required
						id="course_name"
						value={name}
						className={styles.course_name_field}
						onChange={e => setName(e.target.value)}
					/>

					<br />
					<br />

					{!waitCreateCourse && (
						<input
							type="submit"
							value="Create"
							className={`${styles.submit_course_active} ${styles.submit_course}`}
						/>
					)}
					{waitCreateCourse && (
						<input
							type="submit"
							value="Create"
							className={`${styles.submit_course_not_active} ${styles.submit_course}`}
						/>
					)}
				</form>

				{createCourseError && (
					<p
						style={{
							color: "red",
							marginBottom: 10,
							textAlign: "center",
							fontSize: "var(--f1)",
						}}
					>
						{createCourseError}
					</p>
				)}
			</div>
		</div>
	);
};

export default CreateCourse;
