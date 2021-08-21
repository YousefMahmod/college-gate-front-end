import styles from './CoursePreview.module.css'

const CoursePreview = ({course, isProfessor}) => {

    const showProfessorCoursePreview = () => {

        return (
            
            <div className={styles.course_preview}>

                <img 
                    src="https://picsum.photos/1200/600" 
                    alt="courseImage" 
                />
                <p>Name: {course.name}</p>
                <p>Key: {course.key}</p>

            </div>
        )
    }

    const showStudentCoursePreview = () => {


    }

    return ( 
        <div >
            
            {isProfessor ? showProfessorCoursePreview() : showStudentCoursePreview()}

        </div>
    );
}
 
export default CoursePreview;