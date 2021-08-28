import { useContext } from "react";
import { UserDataContext } from "../../Contexts/UserDataContext";
import CoursePreview from "./CoursePreview";
import styles from "./CoverCourse.module.css";

const CoverCourse = ({ isProfessor }) => {
	const { course } = useContext(UserDataContext);

	return (
		<div
			className={styles.cover_course}
			style={{
				background: `url(https://picsum.photos/1200/600)`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				height: "170px",
			}}
		>
			{/* <img
				src="https://picsum.photos/1200/600"
				alt="CourseCoverImage"
				className={styles.cover_image}
			/> */}

			<CoursePreview course={course} isProfessor={isProfessor} />
		</div>
	);
};

export default CoverCourse;
