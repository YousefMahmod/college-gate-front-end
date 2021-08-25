import { Link } from "react-router-dom"
import styles from './Tab.module.css'
const Tab = ({item}) => {

    let tabState = styles.not_active_tab;

    if(item.isActive) {
        tabState = styles.active_tab;
    }
    return ( 

        <li className={`${tabState} ${styles.tab}`}>
            <Link to={item.link}>{item.text}</Link>
        </li> 
    );
}
 
export default Tab;