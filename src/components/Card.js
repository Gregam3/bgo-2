import React from "react";
import "./Card.css";

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

function Card({title, description, imagePath, cardType, cardQuality}) {
    return (
        <div className="card">
            <div className={"card-header"}>
                <img src={`/images/card-icons/${cardType}-icon.png`} alt={""} width={30} style={{
                    backgroundColor: cardQuality.color,
                }}/>
                <h2>
                    {title}
                </h2>
            </div>
            <img src={imagePath} alt={""}/>
            <p>{description}</p>
        </div>
    );
}

export default Card;