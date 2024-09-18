import React, { useState } from "react";
import Counters from "../Counters.js";
import gamepadImage from "../images/gamepad.png";
import NavigationButton from "../NavigationButton.js";
import profileImage from "../images/Profile.png";
import ratingImage from "../images/rating.png";
import coinIconImage from "../images/CoinIcon.png";
import ClickerGamepad from "../ClickerGamepad.js";
import EnergyBar from "../EnergyBar.js";
import "../styles/MainPageClicker.css";
import "../styles/Page.css";

export function MainPage(props){

    return (
        <div className="MainPage Page">
            <Counters isDisabledDataCounters={false} money={props.money} moneyOnTap={props.moneyOnTap} moneyPerSecond={props.moneyPerSecond} />
            <div className="MainPageTopData">
                <div className="MainPageLeftMenu MainPageTopDataMenuComponent">
                    <NavigationButton image={profileImage} to="/profile" />
                </div>
                <div className="MainPageMoneyBox">
                    <img src={coinIconImage} className="MainPageMoneyImage" />
                </div>
                <div className="MainPageRightMenu MainPageTopDataMenuComponent">
                    <NavigationButton image={ratingImage} to="/rating" />
                </div>
            </div>
            <ClickerGamepad onClick={props.clickAction}/>
            {/* ENERGY */}
            <EnergyBar energy={props.energy}/>
        </div>
    );
};