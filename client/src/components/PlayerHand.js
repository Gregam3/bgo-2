import React, {useState} from "react";
import Card, {PregeneratedCard} from "./Card";
import './styles/PlayerHand.css';

// TODO possibly use window.innerWidth to determine how many cards to show before overlaying
const MAX_CARDS_BEFORE_OVERLAY = 5;

function PlayerHand({playerHand, selectedHandIndexes, setSelectedHandIndexes}) {
    // If player has over MAX_CARDS_BEFORE_OVERLAY, we want to start overlaying the cards
    function getCardMargin() {
        if (playerHand.length > MAX_CARDS_BEFORE_OVERLAY) {
            return -(playerHand.length - MAX_CARDS_BEFORE_OVERLAY) * 50;
        } else {
            return (MAX_CARDS_BEFORE_OVERLAY - playerHand.length) * 10;
        }
    }

    const handleCardClick = (index) => {
        if (selectedHandIndexes.includes(index)) {
            setSelectedHandIndexes(selectedHandIndexes.filter((i) => i !== index));
        } else {
            setSelectedHandIndexes([...selectedHandIndexes, index]);
        }
    }

    if (!playerHand) return null;

    return (
        <div className={"hand-container"}>
            <ul className={"player-hand"}>
                {playerHand.map((card, index) => (
                    <li key={index} style={{marginLeft: getCardMargin()}}
                        className={selectedHandIndexes.includes(index) ? "selected" : "deselected"}
                        onClick={() => handleCardClick(index)}>
                        <Card card={card}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerHand;