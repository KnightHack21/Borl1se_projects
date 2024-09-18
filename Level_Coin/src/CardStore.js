import React from "react";
import "./styles/CardStore.css";
import coinImage from "./images/CoinIcon.png";
export default React.memo(function CardStore(props){

    let updateTypeText = ' за тап';
    if (props.card.cardUpdateType === 'energy'){
        updateTypeText = ' к максимальной энергии';
    }
    if (props.card.cardUpdateType === 'moneyPerSecond'){
        updateTypeText = ' к прибыли в час';
    }
    if (props.card.cardLevel !== props.card.cardMaxLevel){
    return (
        <div className="CardStore">
            <div className="CardName">
                {props.card.cardName}
            </div>
            <div className="CardImageBox">
                <img src={props.card.cardImage} className="CardImage" />
            </div>
            <div className="CardData">
                <div className="CardUpdateData">
                    +{props.card.cardUpdateData}{updateTypeText}
                </div>
                <div className="CardMainInfo">
                    <button value={props.card.cardUpdateType} className="CardBuyButton" onClick={props.onClick} name={props.card.cardName} >
                        <span className="CardLevel" name={props.card.cardName} >{props.card.cardLevel} ур.</span>
                        <div className="CardPriceBox" name={props.card.cardName}>
                            <span className="CardPrice" name={props.card.cardName} >{props.card.cardPrice}</span>
                            <img src={coinImage} name={props.card.cardName} className="CardPriceCoinImage" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
    }else{
     return (
        <div className="CardStore">
            <div className="CardName">
                {props.card.cardName}
            </div>
            <div className="CardImageBox">
                <img src={props.card.cardImage} className="CardImage" />
            </div>
            <div className="CardData">
                <div className="CardUpdateData">
                    +{props.card.cardUpdateData}{updateTypeText}
                </div>
                <div className="CardMainInfo">
                    MAX LEVEL
                </div>
            </div>
        </div>
     );   
    }
}, (prevProps, nextProps) => {
    if (nextProps.cardLevel !== prevProps.cardLevel){
        return true;
    }
    return false;
}
);