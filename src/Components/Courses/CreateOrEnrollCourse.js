import { useContext, useEffect, useRef, useState } from "react";
import { UserDataContext } from "../../Contexts/UserDataContext";
// import styles from './CreateCourse.module.css';
import styles from "./Courses.module.css";

const CreateOrEnrollCourse = ({
	closeCreateOrEnrollCourseCard,
	isPrfoessor,
}) => {
	// const {dispatch} = useContext(CourseContext);

	//const {addCourse, fetchError, isPending, setIsPending} = useContext(CourseContext);
	const { addCourse, enrollOnCourse } = useContext(UserDataContext);
	const [waitCreateOrEnrollCourse, setWaitCreateOrEnrollCourse] =
		useState(false);
	const [CreateOrEnrollCourseError, setCreateOrEnrollCourseError] =
		useState("");

	const courseButtonDisplayRef = useRef();

	// console.log("isPending", isPending);
	// console.log("fetchError", fetchError);

	// useEffect(() => {

	//     console.log("useEffect Called");
	//     setIsPending(true);
	// }, []);

	const [input, setInput] = useState("");
	// const [key, setKey] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		setWaitCreateOrEnrollCourse(true);
	};
	//what should i do to abort fetch when refresh page
	useEffect(() => {
		const abortConst = new AbortController();

		if (waitCreateOrEnrollCourse) {
			courseButtonDisplayRef.current.className = `submit_button submit_not_active_button`;
			setWaitCreateOrEnrollCourse(false);

			if (isPrfoessor) {
				const course = {
					name: input,
				};
				addCourse(course, abortConst).then(({ data, res }) => {
					if (res.ok) {
						setCreateOrEnrollCourseError("");
						closeCreateOrEnrollCourseCard();
					} else {
						setCreateOrEnrollCourseError(data.message);
					}
				});
			} else {
				enrollOnCourse(input, abortConst).then(({ data, res }) => {
					if (res.ok) {
						setCreateOrEnrollCourseError("");
						closeCreateOrEnrollCourseCard();
					} else {
						setCreateOrEnrollCourseError(data.message);
					}
				});
			}
		}

		// return () => {
		// 	abortConst.abort();
		// };
	}, [waitCreateOrEnrollCourse]);

	useEffect(() => {
		if (CreateOrEnrollCourseError) {
			courseButtonDisplayRef.current.className = `submit_button submit_active_button`;
		}
	}, [CreateOrEnrollCourseError]);

	const handleCloseCourseCard = () => {
		if (!waitCreateOrEnrollCourse) {
			closeCreateOrEnrollCourseCard();
		}
	};

	return (
		<div
			className={`${styles.container_create_course_card} center_flex`}
			// onClick={() => handleCloseCourseCard(true)}
		>
			<div className={styles.overLay} onClick={handleCloseCourseCard}></div>
			<div
				className={` ${styles.create_course_card}`}
				// onClick={() => handleCloseCourseCard(false)}
			>
				<div className={styles.create_course_header}>
					{isPrfoessor && <h2>Create Course</h2>}
					{!isPrfoessor && <h2>Enroll Course</h2>}
					<img
						src="/Icons/closeButton.svg"
						alt="close"
						onClick={handleCloseCourseCard}
					/>
				</div>
				<form onSubmit={e => handleSubmit(e)}>
					{isPrfoessor && (
						<label htmlFor="course_input">Enter Course Name</label>
					)}
					{!isPrfoessor && (
						<label htmlFor="course_input">Enter Course Key</label>
					)}

					<input
						type="text"
						required
						id="course_input"
						value={input}
						className={styles.course_name_field}
						onChange={e => setInput(e.target.value)}
					/>

					<div
						style={{
							textAlign: "right",
							marginTop: "10px",
							marginBottom: "10px",
						}}
					>
						{CreateOrEnrollCourseError && (
							<span
								style={{
									color: "red",
									fontSize: "var(--f1)",
									marginRight: "10px",
								}}
							>
								{CreateOrEnrollCourseError}
							</span>
						)}
						<input
							type="submit"
							value={isPrfoessor ? "Create" : "Enroll"}
							ref={courseButtonDisplayRef}
							className={`submit_button`}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateOrEnrollCourse;
