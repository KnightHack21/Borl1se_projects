import React from "react";
import { Link } from "react-router-dom";

import "./styles/navigation.css";

export default React.memo(function NavigationButton(props){
    return (
        <Link className="navigation_menu_link" to={props.to} >
            <img className="navigation_menu_image" src={ props.image } />
        </Link>
    );
}, (prevProps, nextProps) => {
    if (nextProps === prevProps){
        return false;
    }
    return true;
}
);