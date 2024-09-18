import React from "react";
import { Link } from "react-router-dom";
import mainPageIcon from "./images/mainPageIcon.png";
import storePageIcon from "./images/storePageIcon.png";
import questsPageIcon from "./images/questsPageIcon.png";
import referalsPageIcon from "./images/referalsPageIcon.png";
import NavigationButton from "./NavigationButton.js";

import "./styles/navigation.css";

export default React.memo(function Navigation(){
    return (
        <ul className="navigation_menu">
            <li className="navigation_menu_component">
                <NavigationButton image={mainPageIcon} to={"/"} />
            </li>
            <li className="navigation_menu_component">
                <NavigationButton image={storePageIcon} to={"/store"} />
            </li>
            <li className="navigation_menu_component">
                <NavigationButton image={questsPageIcon} to={"/quests"} />  
            </li>
            <li className="navigation_menu_component">
                <NavigationButton image={referalsPageIcon} to={"/referals"} />
            </li>
    </ul>
    );
    }, (prevProps, nextProps) => {
        if (nextProps === prevProps){
            return false;
        }
        return true;
    }
);