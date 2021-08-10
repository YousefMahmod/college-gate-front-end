import {createContext} from "react";
import {HOME_LINK, COURSES_LINK, WARNINGS_LINK} from '../Constants';
export const ItemsOfSideBarContext = createContext();

const ItemsOfSideBarContextProvider = (props) => {
    const listOfItems = [
        {text:"Home", link:HOME_LINK, id:1},
        {text:"Courses", link:COURSES_LINK, id:2},
        {text:"Warnings", link:WARNINGS_LINK, id:3},
    ];

    return (  
        <ItemsOfSideBarContext.Provider value={{listOfItems}}>
            {props.children}
            {/* {props.children[1].props.children} */}
        </ItemsOfSideBarContext.Provider>
    );
}
 
export default ItemsOfSideBarContextProvider;