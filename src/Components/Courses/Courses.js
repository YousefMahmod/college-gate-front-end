import { useContext, useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { AuthContext } from "../../Contexts/AuthContext";
import { CourseContext } from "../../Contexts/CourseContext";
import Course from "./Course";
import CourseButton from "./CourseButton";
import styles from "./Courses.module.css";
import CreateCourse from "./CreateCourse";
import CreateOrEnrollCourse from "./CreateOrEnrollCourse";

const Courses = ({ isProfessor }) => {
	const [showCreateCourseCard, setShowCreateCourseCard] = useState(false);

	// const { course } = useContext(CourseContext);
	const { courses } = useContext(CourseContext);
	const { getCourses } = useContext(CourseContext);
	const { waitCourses } = useContext(CourseContext);

	// const [habla, setHabla] = useState(false);
	
	const match = useRouteMatch();
	// console.log("match", match);
	// console.log("hablaState");
	
	const popupCreateCourseWindow = () => {
		setShowCreateCourseCard(true);
	};

	const closeCreateCourseCard = () => {
		setShowCreateCourseCard(false);
	};

	useEffect(() => {

        const abortFetch = new AbortController(); //هل هيتسمح من الميمورى ؟
		
        if(courses.length === 0){
            getCourses(abortFetch);
			console.log("after getcourses");
			// setHabla(true);
			// console.log("habla", habla);
        }
		
        return () => abortFetch.abort();
	}, []);

	// useEffect(()=> {

	// 	console.log("habla useEffect");

	// }, [habla])

	// console.log("Courses", courses);
	// console.log("waitCourses", waitCourses);

	const showProfessorCourses = () => {
		if (courses) {
			return (
				<div className={styles.courses} >
					{courses.map(course => (
						<CourseButton isProfessor={true} course={course} key={course.id} />
					))}

					{/* <CourseButton isCreateButton={true} isProfessor={true} course = {null}/> */}
					<CreateOrEnrollCourse
						isProfessor={true}
						popupCreateCourseWindow={popupCreateCourseWindow}
					/>
					{showCreateCourseCard && (
						<CreateCourse closeCreateCourseCard={closeCreateCourseCard} />
					)}
				</div>
			);
		} else if (!waitCourses) {
			return (
				<div className={styles.courses}>
					<CreateOrEnrollCourse
						isProfessor={true}
						popupCreateCourseWindow={popupCreateCourseWindow}
					/>
					{showCreateCourseCard && (
						<CreateCourse closeCreateCourseCard={closeCreateCourseCard} />
					)}
				</div>
			);
		}
	};

	const showStudentCourses = () => {};

	return (
		<div>
			<Route exact path={match.path}>
				{waitCourses && <div> Loading .....</div>}
				{isProfessor ? showProfessorCourses() : showStudentCourses()}
			</Route>

			<Route path={`${match.path}/:name`} component={Course} />
		</div>
	);
};

export default Courses;
