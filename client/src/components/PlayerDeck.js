import React from "react";
import './styles/PlayerDeck.css';

function PlayerDeck({playerDeck}) {
    return (
        <div className={"deck-container"}>
            {/*<p>Deck</p>*/}
            <p>{playerDeck?.length || 0} cards</p>
        </div>
    );
}

export default PlayerDeck;