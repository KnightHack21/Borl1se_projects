import React from "react";
import CounterMoney from "./CounterMoney";
import "./styles/Counters.css";
import CounterData from "./CounterData";

export default React.memo(function Counters({ isDisabledDataCounters, money, moneyOnTap, moneyPerSecond }){
    const nameCounterMoneyPerClick = "прибыль за тап";
    const nameCounterMoneyPerHour = "прибыль за час";
    if (isDisabledDataCounters){
        return (
            <div className="Counters">
                <CounterMoney money={money} />
            </div>
        );
    }else{
        return (
            <div className="Counters">
                <CounterMoney money={money} />
                <div className="CountersData">
                    <CounterData name={nameCounterMoneyPerClick} money={moneyOnTap} />
                    <CounterData name={nameCounterMoneyPerHour} money={moneyPerSecond}/>
                </div>
            </div>
        );
    }
}
);