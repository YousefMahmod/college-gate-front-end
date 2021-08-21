import styles from './Courses.module.css'

const CreateOrEnrollCourse = ({isProfessor, popupCreateCourseWindow}) => {

    const showCreateCourseButton = () => {

        return (
            <div 
                className={styles.create_course_button} 
                onClick={popupCreateCourseWindow}
            >
                   
                <img src="/Icons/plusIcon.svg" alt="create" />
                
                <p>Create Course</p>
            </div>
        )

    }

    const showEnrollCourseButton = () => {

    } 

    return ( 

        <div className={styles.course_button} >

            {isProfessor ? showCreateCourseButton() : showEnrollCourseButton()}
            
        </div>
    );
}
 
export default CreateOrEnrollCourse;