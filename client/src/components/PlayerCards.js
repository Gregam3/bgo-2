import React, {useState} from 'react';
import HandUI from "./HandUI";
import PlayerHand from "./PlayerHand";
import './styles/PlayerCards.css'
import PlayerDeck from "./PlayerDeck";

const PlayerCards = ({gameState, setGameState, playerHand, playerDeck, addEvent, playerId, playerFinishedEvent}) => {
    const [selectedHandIndices, setSelectedHandIndices] = useState([]);

    return <div className={"player-cards-container"}>
        <div className={"hand-action-container"}>
            <PlayerHand playerHand={playerHand}
                        selectedHandIndexes={selectedHandIndices}
                        setSelectedHandIndexes={setSelectedHandIndices}
            />
            <HandUI
                gameState={gameState}
                setGameState={setGameState}
                playerDeck={playerDeck}
                playerHand={playerHand}
                selectedHandIndices={selectedHandIndices}
                addEvent={addEvent}
                playerId={playerId}
                setSelectedHandIndices={setSelectedHandIndices}
                playerFinishedEvent={playerFinishedEvent}
            />
        </div>
        <PlayerDeck playerDeck={playerDeck} playerHand={playerHand}/>
    </div>
}

export default PlayerCards;