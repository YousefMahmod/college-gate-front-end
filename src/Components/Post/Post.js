import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import UserPreview from '../UserPreview/UserPreview';
import styles from './Post.module.css';

const Post = ({post}) => {
    
    const user = useContext(AuthContext);
    
    return (
        <div className={styles.post}>

            <UserPreview user={user} course={{name:"Math"}} date={post.date} /> 
            <p>{post.content}</p>
            <span className={styles.bar}></span>

        </div>
        
    );
}
 
export default Post;