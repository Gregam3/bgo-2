import React, { useState, useEffect } from "react";
import CardDisplay from "../CardDisplay";
import "../styles/OpenPackEvent.css";

const PackPhase = {
    OPEN_PACK: "OPEN_PACK",
    CHOOSE_CARD: "CHOOSE_CARD",
    ADD_CARD_TO_DECK: "ADD_CARD_TO_DECK",
};

const OpenPack = ({ packData, onPackOpened }) => {
    const [packPhase, setPackPhase] = useState(PackPhase.OPEN_PACK);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPackPhase(PackPhase.CHOOSE_CARD);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    const handleCardSelect = (card) => {
        setPackPhase(PackPhase.ADD_CARD_TO_DECK);
        setSelectedCard(card);
        setTimeout(() => {
            onPackOpened(card);
        }, 200);
    };

    return (
        <div className={`pack-card-container ${packPhase}`}>
            {packPhase === PackPhase.CHOOSE_CARD && (
                packData.possibleCards.map((card) => (
                    <div key={card.id} onClick={() => handleCardSelect(card)}>
                        <CardDisplay card={card} />
                    </div>
                ))
            )}
            {packPhase === PackPhase.ADD_CARD_TO_DECK && (
                <div className="selected-card">
                    <CardDisplay card={selectedCard} />
                </div>
            )}
        </div>
    );
};

export default OpenPack;
