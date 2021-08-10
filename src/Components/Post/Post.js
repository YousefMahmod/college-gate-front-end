import UserPreview from '../UserPreview/UserPreview';
import styles from './Post.module.css';

const Post = ({post, user}) => {
    return (
        <div className={styles.post}>

            <UserPreview user={user} course={{name:"Math"}} date={post.date} /> 
            <p>{post.content}</p>
            <span className={styles.bar}></span>

        </div>
        
    );
}
 
export default Post;