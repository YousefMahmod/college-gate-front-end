import { Link } from "react-router-dom"

const ItemButton = ({text, link, state}) => {
    let className = "unActive";
    if(state === link){
        className = "Active";
    }
    return ( 
       <li>
           <Link to = {link} className={className}>
               <span>{text}</span>
           </Link>
          
       </li>
    );
}
 
export default ItemButton;