import React from "react";
import "./styles/Card.css";


export const CARD_TYPE = {
    ITEM: "item",
    SPELL: "spell",
    CLASS: "class",
    ROLL: "roll",
};

export const CARD_QUALITY = {
    COMMON: {
        name: "common",
        color: "#f0f0f0",
    },
    UNCOMMON: {
        name: "uncommon",
        color: "#00ff00",
    },
    RARE: {
        name: "rare",
        color: "#0000ff",
    },
    EPIC: {
        name: "epic",
        color: "#ad05ad",
    },
    LEGENDARY: {
        name: "legendary",
        color: "#ffc907",
    },
}

function Card({card}) {
    return (
        <div className={`card ${card.played ? 'played' : ''}`}>
            <div className={"card-header"}>
                <img src={`/images/card-icons/${card.cardType}-icon.png`} alt={""} width={30} style={{
                    backgroundColor: CARD_QUALITY[card.cardQuality].color,
                }}/>
                <h2>
                    {card.title}
                </h2>
            </div>
            <img src={card.imagePath} alt={""} className={"card-image"}/>
            <p>{card.description}</p>
        </div>
    );
}

export default Card;