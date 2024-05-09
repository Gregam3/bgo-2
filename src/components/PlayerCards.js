import React from 'react';
import HandUI from "./HandUI";
import PlayerHand from "./PlayerHand";
import './styles/PlayerCards.css'
import PlayerDeck from "./PlayerDeck";


const PlayerCards = ({playerHand}) => {
    return <div className={"player-cards-container"}>
        <div className={"hand-action-container"}>
            <PlayerHand playerHand={playerHand}/>
            <HandUI/>
        </div>
        <PlayerDeck/>
    </div>
}

export default PlayerCards;