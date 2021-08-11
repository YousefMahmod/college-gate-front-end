import { useContext} from "react";
import { useLocation } from "react-router-dom";
import { ItemsOfSideBarContext } from "../../Contexts/ItemsOfSideBarContext";
import ItemButton from "./ItemButton";
import Profile from "../Profile/Profile";
import { AuthContext } from "../../Contexts/AuthContext";

const SideBar = ({collapsed}) => {
   
    const {listOfItems} = useContext(ItemsOfSideBarContext);
    const location = useLocation();
    const user = useContext(AuthContext);

    console.log(listOfItems);
    
    let className = "side-bar";
    if(collapsed){
        className = "side-bar-collabse" ;
    }
    return (
         
        <div className={className}>

            <Profile user={user} />
            <ul>
                {listOfItems.map((item) => (

                        <ItemButton 
                            text={item.text} 
                            link={item.link} 
                            state= {location.pathname} 
                            key={item.id} 
                        />
                    )
                  
                )}
            </ul>
        </div>
    );
}
 
export default SideBar;