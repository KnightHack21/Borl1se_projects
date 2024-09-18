import React from "react";
import coinIcon from "./images/CoinIcon.png";
import "./styles/CounterMoney.css";

export default function CounterMoney({ money }){
    return (
        <div className="CounterMoney">
            <img src={coinIcon} className="CounterCoinMoneyImage"/>
            <div className="counter">
                { money }
            </div>
        </div>
    );
};