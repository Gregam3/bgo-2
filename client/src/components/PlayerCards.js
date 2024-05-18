import React, {useState} from 'react';
import HandUI from "./HandUI";
import PlayerHand from "./PlayerHand";
import './styles/PlayerCards.css'
import PlayerDeck from "./PlayerDeck";

const PlayerCards = ({playerHand, playerDeck, addEvent, playerId}) => {
    const [selectedHandIndices, setSelectedHandIndices] = useState([]);


    return <div className={"player-cards-container"}>
        <div className={"hand-action-container"}>
            <PlayerHand playerHand={playerHand}
                        selectedHandIndexes={selectedHandIndices}
                        setSelectedHandIndexes={setSelectedHandIndices}
            />
            <HandUI
                playerHand={playerHand}
                selectedHandIndices={selectedHandIndices}
                addEvent={addEvent}
                playerId={playerId}
                setSelectedHandIndices={setSelectedHandIndices}
            />
        </div>
        <PlayerDeck playerDeck={playerDeck}/>
    </div>
}

export default PlayerCards;