import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Student from "../Student/Student";
import {useEffect, useState} from 'react';
import ItemsOfSideBarContextProvider from "../../Contexts/ItemsOfSideBarContext";
import { Route, Switch } from "react-router-dom";
import Professor from "../Professor/Professor";
import Employee from "../Department/Employee";
import RedirectHandler from "../RedirectHandler/RedirectHandler";

const Account = () => {

    console.log("Account.js");
    const user = {

        img:"https://via.placeholder.com/150",
        name:"Ahmed Mahmoud",
        type:"Student"
       
    }
    const [collabsed, setCollabsed] = useState(() =>{

        if(window.innerWidth <= 1100){
            return true;
        }
        else {
            return false;
        }
    });

    const [showSideBarBlock, setShowSideBarBlock] = useState(() =>{

        if(window.innerWidth <= 1100){
            return true;
        }
        else {
            return false;
        }
    });

    const [clicked, setClicked] = useState(false);

   
    
    useEffect(() => {

        function handleResize() {
           
            // console.log("Called" , clicked);
            if(window.innerWidth <= 1100 && !clicked){
                setCollabsed(true);
                setShowSideBarBlock(true);
            }
            else if(window.innerWidth > 1100) {
                setCollabsed(false);
                setShowSideBarBlock(false);
                setClicked(false);
            }
            else {
              setCollabsed(false);
            }
        };
        
        const handleOnClick = (pressed) => {
            // console.log(pressed);
            setClicked(pressed);
            setCollabsed(!collabsed);
        };
       
        if(showSideBarBlock) {
            const sideBar = document.getElementById("side-bar");
            sideBar.addEventListener('click', () => handleOnClick(!clicked));
        }

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize',handleResize);
            
        }
      },[clicked, showSideBarBlock, collabsed]);

    return ( 

        <div className="account">
            
            <RedirectHandler />

            <Header
                showSideBarBlock={showSideBarBlock} 
                collabsed={collabsed}
            />

            <ItemsOfSideBarContextProvider>
                <SideBar user={user} collapsed={collabsed}/>
            </ItemsOfSideBarContextProvider>

            <Switch>

                <Route path="/student" component={Student} />

                <Route path="/professor" component={Professor} />

                <Route path="/department" component={Employee} />
               

            </Switch>
         
            
        </div>
    );
}
 
export default Account;