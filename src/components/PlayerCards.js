import React, {useState} from 'react';
import HandUI from "./HandUI";
import PlayerHand from "./PlayerHand";
import './styles/PlayerCards.css'
import PlayerDeck from "./PlayerDeck";


const PlayerCards = ({playerHand}) => {
    const [selectedHandIndexes, setSelectedHandIndexes] = useState([]);

    return <div className={"player-cards-container"}>
        <div className={"hand-action-container"}>
            <PlayerHand playerHand={playerHand} selectedHandIndexes={selectedHandIndexes} setSelectedHandIndexes={setSelectedHandIndexes}/>
            <HandUI selectedHandIndexes={selectedHandIndexes}/>
        </div>
        <PlayerDeck/>
    </div>
}

export default PlayerCards;