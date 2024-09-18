import React from "react";
import energyImage from "./images/EnergyLogo.png";
import "./styles/EnergyBar.css";

export default function EnergyBar(props){

    let energyValue = props.energy + "%";

    return (
        <div className="EnergyBar">
            <img className="EnergyImage" src={energyImage}/>
            <div className="EnergyBox">
                <div className="progressEnergy" id="progressEnergy" style={{width:energyValue}} ></div>
            </div>
        </div>
    );
}