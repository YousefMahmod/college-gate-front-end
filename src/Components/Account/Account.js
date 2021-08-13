import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Student from "../Student/Student";
import {useContext, useEffect, useState} from 'react';
import ItemsOfSideBarContextProvider from "../../Contexts/ItemsOfSideBarContext";
import { Route, Switch } from "react-router-dom";
import Professor from "../Professor/Professor";
import Employee from "../Department/Employee";
import RedirectHandler from "../RedirectHandler/RedirectHandler";
import { AuthContext } from "../../Contexts/AuthContext";
import styles from './Account.module.css'

const Account = () => {

    console.log("Account.js");

    return ( 

        <div className={styles.account}>
            
            <RedirectHandler />

            <Header />

            <ItemsOfSideBarContextProvider>
                <SideBar />
            </ItemsOfSideBarContextProvider>
            <div className= {styles.account_main}>
                <Switch>

                    <Route path="/student" component={Student} />

                    <Route path="/professor" component={Professor} />

                    <Route path="/department" component={Employee} />

                </Switch>
            </div>
            
                
        </div>
    );
}
 
export default Account;