import React, {useState, useEffect} from "react";

import { Routes, Route, Link} from "react-router-dom";

import { MainPage } from "./pages/MainPage.js";
import { StorePage } from "./pages/StorePage.js";
import { QuestsPage } from "./pages/QuestsPage.js";
import { ReferalsPage } from "./pages/ReferalsPage.js";
import { ErrorPage } from "./pages/ErrorPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";

import gamepadStoreIcon from "./images/gamepadStore.png";
import energyStoreIcon from "./images/energyStore.png";
import catStoreIcon from "./images/catError.gif";

import coinImage from "./images/CoinIcon.png";

import Navigation from "./Navigation.js";

export default function RootApp(){
    const [myCards, setMyCards] = useState([]);
    const [money, setMoney] = useState(0);
    const [energy, setEnergy] = useState(100);
    const [moneyOnTap, setMoneyOnTap] = useState(1);
    const [moneyPerSecond, setMoneyPerSecond] = useState(0);
    let cardsConsole = [{
        cardName: "Монет за Тап",
        cardImage: gamepadStoreIcon,
        cardUpdateType: "click",
        cardUpdateData: 1,
        cardLevel: 1,
        cardMaxLevel: 3,
        cardDescription: "Эта карточка — настоящий подарок для тех, кто любит зарабатывать. При её прокачке вы получаете дополнительную прибыль за каждый тап. Так что теперь каждое ваше действие будет приносить ещё больше денег!",
        cardPrice: 10
    },
    {
        cardName: "Банка Энергии",
        cardImage: energyStoreIcon,
        cardUpdateType: "energy",
        cardUpdateData: 10,
        cardLevel: 1,
        cardMaxLevel: 10,
        cardDescription: "Эта карточка — настоящее сокровище для любителей игры. При её прокачке вы получаете дополнительную энергию, благодаря которой можете совершать больше тапов. Теперь у вас есть возможность увеличить свою продуктивность и заработать ещё больше очков!",
        cardPrice: 100
    }
    ];

    let cardsGames = [
        {
        cardName: "Grand Theft Level",
        cardImage: catStoreIcon,
        cardUpdateType: "moneyPerSecond",
        cardUpdateData: 1,
        cardLevel: 1,
        cardMaxLevel: 5,
        cardDescription: "Эта карточка — настоящий подарок для тех, кто любит зарабатывать. При её прокачке вы получаете дополнительную прибыль за каждый тап. Так что теперь каждое ваше действие будет приносить ещё больше денег!",
        cardPrice: 10
    }
];
    const [cards, setCards] = useState(cardsConsole);
    const [gameCards, setGameCards] = useState(cardsGames);
    const handleClick = (event) => {
        if (energy >= moneyOnTap){
            setEnergy(energy => {
                if (energy >= moneyOnTap){
                    pop(event)
                    setMoney(money => money + moneyOnTap);
                    return energy - moneyOnTap
                }else if (energy <= 0){
                    return 0;
                }else{
                    return energy;
                }
            });
        }else{
            return;
        }
    }


    function pop (e) {
        let countParticles = Math.round(Math.random() * 5);
        if (e.clientX === 0 && e.clientY === 0) {
            const bbox = e.target.getBoundingClientRect();
            const x = bbox.left + bbox.width / 2;
            const y = bbox.top + bbox.height / 2;
            for (let i = 0; i < countParticles; i++){
                createParticle(x, y, e.target.dataset.type);
            }
            } else {
                for (let i = 0; i < countParticles; i++){
                    createParticle(e.clientX, e.clientY, e.target.dataset.type);
                }
            }
    }
    function createParticle (x, y, type) {
        const stickyElement = document.querySelector(".ClickerGamepad");
        const particle = document.createElement('particle');
        // document.body.appendChild(particle);
        stickyElement.appendChild(particle)
        let width = Math.floor(Math.random() * 30 + 30);
        let height = width;
        let destinationX = (Math.random() - 0.5) * 300;
        let destinationY = (Math.random() - 0.5) * 300;
        let rotation = Math.random() * 520;
        let delay = Math.random() * 50;
        particle.style.backgroundImage = `url(${coinImage})`;
        particle.style.width = `${width}px`;
        particle.style.height = `${height}px`;
        const animation = particle.animate(
            [
            {
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translate(-50%, -50%) translate(${x + destinationX / 2}px, ${y + destinationY}px) rotate(${rotation}deg)`,
                opacity: 0.8
            },
            {
                transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y - 15}px) rotate(${rotation}deg)`,
                opacity: 0
            }
            ]
            , {
            duration: Math.random() * 1000 + 3000, // Продолжительность всех эффектов
            easing: 'cubic-bezier(0, .9, .57, 1)',
            delay: delay
        });
        animation.onfinish = removeParticle;
    }
    function removeParticle (e) {
        e.srcElement.effect.target.remove();
    }

    const incrementEnergy = () => {
        if (energy <= 100){
            setEnergy(energy => energy + 1);
        }
    }

    const incrementMoney = () => {
        setMoney(money => money + moneyPerSecond);
    }

    useEffect (() => {
        let timer = setInterval(incrementMoney, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [moneyPerSecond])

    useEffect(() => {
        let timer = setInterval(incrementEnergy, 1000);
        return () => {
            clearInterval(timer);
        }
    },[energy]);

    const buyCardAction = (cardCurr, cardPrice, cardsTabName) => {
        setMoney(mon => mon - cardPrice);
        if (cardCurr.cardUpdateType === 'click'){
            setMoneyOnTap(moneyOnTap => moneyOnTap + cardCurr.cardUpdateData);
        }
        if (cardCurr.cardUpdateType === 'moneyPerSecond'){
            console.log("Update Money per Second")
            setMoneyPerSecond(moneyPerSecond => moneyPerSecond + cardCurr.cardUpdateData);
        }
        let newCards; 
        if (cardsTabName === 'Console'){
            newCards= cards.filter((card) => {
                if (card.cardName === cardCurr.cardName){
                    card.cardLevel += 1;
                    card.cardPrice = Math.round(card.cardPrice * 2.71);
                    return card;
                }else{
                    return card;
                }
            });
            setCards(newCards);
        }
        if (cardsTabName === 'Games'){
            newCards= gameCards.filter((card) => {
                if (card.cardName === cardCurr.cardName){
                    card.cardLevel += 1;
                    card.cardPrice = Math.round(card.cardPrice * 2.71);
                    return card;
                }else{
                    return card;
                }
            });
            setGameCards(newCards);
        }
        const arrayObjectIndexOf = (list, findField, searchDataField) => {
            let result = -1;
            for (let i = 0; i < list.length; i++){
                if (list[i][findField] === searchDataField){
                    result = 1;
                    return result;
                }
            }
            return result;
        }
        let findIndex = arrayObjectIndexOf(myCards, 'cardName', cardCurr.cardName);
        if (findIndex == -1){
            setMyCards((prev) => 
                [...prev, cardCurr]
            )
        }
    }

    return (
        <div className="RootApp">
            <Routes>
                <Route path="/" element={<MainPage clickAction={handleClick} money={money} energy={energy} moneyOnTap={moneyOnTap} moneyPerSecond={moneyPerSecond} />}/>
                <Route path="/store" element={<StorePage money={money} moneyOnTap={moneyOnTap} buyCardActionClick={buyCardAction} cards={cards} gameCards={gameCards} moneyPerSecond={moneyPerSecond}/>} />
                <Route path="/quests" element={<QuestsPage />} />
                <Route path="/referals" element={<ReferalsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
            <Navigation />
        </div>
    );
};