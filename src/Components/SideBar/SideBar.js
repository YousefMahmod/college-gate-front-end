import { useContext} from "react";
import { useLocation } from "react-router-dom";
import { ItemsOfSideBarContext } from "../../Contexts/ItemsOfSideBarContext";
import ItemButton from "./ItemButton";
import Profile from "../Profile/Profile";

const SideBar = ({user, collapsed}) => {
   
    const {listOfItems} = useContext(ItemsOfSideBarContext);
    const location = useLocation();

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