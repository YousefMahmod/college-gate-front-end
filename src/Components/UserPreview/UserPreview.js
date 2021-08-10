import styles from './UserPreview.module.css';

const UserPreview = ({user, course, date}) => {
    
    return ( 
        <div className={styles.user_preview}>

            <img src="https://via.placeholder.com/50" alt="User" />
            
            <div>
                <span>Prof.{user.name}</span>
                <span>{course.name} course</span>
                <span>{date}</span>
            </div>
           
        </div>
    );
}
 
export default UserPreview;