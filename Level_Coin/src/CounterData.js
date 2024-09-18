import React from "react";
import "./styles/CounterData.css";
import coinIcon from "./images/CoinIcon.png";

export default React.memo(function CounterData({ name , money}){
    return (
        <div className="CounterData">
            <div className="counter_money">
                <img src={coinIcon} className="CounterCoinMoneyImage"/>
                <div className="counter">
                    <p className="counter_name_text">{ name }</p>
                    <p className="counter_money_text">{ money }</p>
                </div>
            </div>
        </div>
    );
}
);