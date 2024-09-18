import React, {useState, useEffect} from "react";
import Counters from "../Counters";
import Tabs from "../Tabs";
import TabContent from "../TabContent";
import CardStore from "../CardStore";
import "../styles/Page.css";
import "../styles/StorePage.css";
import coinLogoIcon from "../images/CoinIcon.png";
import gamepadStoreIcon from "../images/gamepadStore.png";
import energyStoreIcon from "../images/energyStore.png";


export function StorePage(props){

    const [tabName, setTabName] = useState('Console');

    useEffect(() => {
        document.getElementById("Console").style.display = "flex";
    }, []);

    const [Modal, setModal] = useState({});

    const getCardData = (event) => {
        let nameThisCard = event.target.getAttribute("name");
        let cardData;
        if (tabName === 'Console'){
            cardData = props.cards.find(cardItem => cardItem.cardName === nameThisCard);
        }
        if (tabName === 'Games'){
            cardData = props.gameCards.find(gameCardItem => gameCardItem.cardName === nameThisCard);
        }
        return cardData;
    }

    const openModal = (event) => {
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        const card = getCardData(event);
        console.log(card);
        setModal({name: card.cardName, image: card.cardImage, description: card.cardDescription, level: card.cardLevel, price: card.cardPrice});
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    const buyCard = (event) => {
        const cardCurr = getCardData(event);
        const cardPrice = cardCurr.cardPrice;
        const userMoney = props.money;
        const cardCurrLevel = cardCurr.cardLevel;
        const cardCurrMaxLevel = cardCurr.cardMaxLevel;
        var modal = document.getElementById("myModal");
        modal.click();
        if (cardCurrLevel >= cardCurrMaxLevel){
            return;
        }
        if (cardPrice > userMoney){
            return;
        }
        props.buyCardActionClick(cardCurr, cardPrice, tabName);
    }



    const openTab = (event) => {
        let tabcontents = document.getElementsByClassName("tabcontent");
        let newName = event.target.name;
        setTabName(tabName => newName);
        for (let i = 0; i < 3; i++){
            tabcontents[i].style.display = "none";
        }
        let currentTabContent = document.getElementById(event.target.name);
        currentTabContent.style.display = "flex";
    }


    return (
        <div className="StorePage Page">
            <Counters isDisabledDataCounters={false} money={props.money} moneyOnTap={props.moneyOnTap} moneyPerSecond={props.moneyPerSecond}/>
            <Tabs openTab={openTab} />
            <TabContent tabid={"Console"}>
                <div className="StoreCardsConsole StoreCards">
                    {props.cards.map((item, index) => <CardStore card={item} onClick={openModal} key={index} />)}
                </div> 
            </TabContent>
            <TabContent tabid={"Games"}>
                <div className="StoreCardsGames StoreCards">
                    {props.gameCards.map((item, index) => <CardStore card={item} onClick={openModal} key={index} />)}
                </div> 
            </TabContent>
            <TabContent tabid={"Collections"}>
                GG
            </TabContent>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-content-top">
                        <span className="close">&times;</span>
                        <p>{Modal.name}</p>
                    </div>
                    <div className="modal-content-main">
                        <div className="modal-content-image">
                            <img src={Modal.image} />
                        </div>
                        <p className="modal-content-description">
                            {Modal.description}
                        </p>
                        <div className="modal-content-buy-data">
                            <div className="modal-content-buy-data-box">
                                <p className="modal-level-data">
                                    Уровень карты : {Modal.level}
                                </p>
                                <p className="modal-price-data">
                                    Стоимость : {Modal.price}
                                    <img src={coinLogoIcon} />
                                </p>
                            </div>
                            <button className="modal-buy-button" onClick={buyCard} name={Modal.name}>
                                Купить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};