import Post from "../Post/Post"
import styles from "./Student.module.css";

const Home = ({user}) => {
    
    const post = {
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error recusandae soluta quidem cumque molestias ipsam, asperiores labore dolores quaerat itaque iure repellat maiores ducimus! Ipsum voluptatem magni eaque dolorum ducimus!",
        date: "date"
    };

    return (  
        <div className={styles.home}>

            <Post post={post} user={user}  />

        </div> 
    );
}
 
export default Home;