import React from 'react';
import cards from "../cards/cards.json";
import {PregeneratedCard} from "./Card";
import './PlayerHand.css';
import HandUI from "./HandUI";

// TODO possibly use window.innerWidth to determine how many cards to show before overlaying
const MAX_CARDS_BEFORE_OVERLAY = 5;

const PlayerHand = ({playerHand}) => {
    const [selectedHandIndexes, setSelectedHandIndexes] = React.useState([]);

    // If player has over MAX_CARDS_BEFORE_OVERLAY, we want to start overlaying the cards
    function getCardMargin() {
        if (playerHand.length > MAX_CARDS_BEFORE_OVERLAY) {
            return -(playerHand.length - MAX_CARDS_BEFORE_OVERLAY) * 25;
        } else {
            return (MAX_CARDS_BEFORE_OVERLAY - playerHand.length) * 10;
        }
    }

    const handleCardClick = (index) => {
        console.log("Card clicked", index);
        if (selectedHandIndexes.includes(index)) {
            setSelectedHandIndexes(selectedHandIndexes.filter((i) => i !== index));
        } else {
            setSelectedHandIndexes([...selectedHandIndexes, index]);
        }
    }

    return (
        <div className={"hand-container"}>
            <ul className={"player-hand"}>
                {playerHand.map((card, index) => (
                    <li key={index} style={{marginLeft: getCardMargin()}}
                        className={selectedHandIndexes.includes(index) ? "selected" : "deselected"}
                        onClick={() => handleCardClick(index)}>
                        <PregeneratedCard card={card}/>
                    </li>
                ))}
            </ul>
            <HandUI/>
        </div>
    );
}

export default PlayerHand;