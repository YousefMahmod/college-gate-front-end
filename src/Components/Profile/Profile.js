import styles from "./Profile.module.css";

const Profile = ({user}) => {
    return ( 
        <div className={styles.profile}>
            <img src={user.img} alt="User" />
            <span>{user.name}</span>
            <span>{user.type}</span>
        </div>
    );
}
 
export default Profile;