import React from "react";
import clickerGamepadImage from "./images/gamepad.png";
import "./styles/ClickerGamepad.css";

export default React.memo(function ClickerGamepad(props){

    return (
        <div className="ClickerGamepad">
            <button className="ClickerGamepadButton" data-type="logo" onClick={props.onClick} >
                <img className="ClickerGamepadImage" data-type="logo" src={clickerGamepadImage}/>
            </button>
        </div>
    );
}, (prevProps, nextProps) => {
    if (nextProps === prevProps){
        return false;
    }
    return true;
}
);