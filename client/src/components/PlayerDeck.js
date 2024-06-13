import React from "react";
import './styles/PlayerDeck.css';

function PlayerDeck({playerDeck, playerHand}) {
    return (
        <div className={"deck-container"}>
            {/*<p>Deck</p>*/}
            <p>{playerDeck?.length || 0} cards in deck</p>
        </div>
    );
}

export default PlayerDeck;