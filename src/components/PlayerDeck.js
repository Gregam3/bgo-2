import React from "react";
import './styles/PlayerDeck.css';

function PlayerDeck({deck}) {
    return (
        <div className={"deck-container"}>
            <p>Deck</p>
            <p>{deck?.length || 0} cards</p>
        </div>
    );
}

export default PlayerDeck;