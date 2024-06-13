import React from "react";
import "./styles/HandUI.css";
import {GameEventType} from "../common/classes/GameEventType";
import {GameEvent} from "../common/classes/GameEvent";
import axios from "axios";

function HandUI({
                    gameState,
                    setGameState,
                    playerHand,
                    playerDeck,
                    selectedHandIndices,
                    setSelectedHandIndices,
                    addEvent,
                    playerId,
                    playerFinishedEvent
                }) {

    function handlePlayCard() {
        setSelectedHandIndices([]);
        const playedCard = playerHand[selectedHandIndices[0]];
        playedCard.played = true;

        axios.post(`http://localhost:3001/play-card`, {
            clientGameState: gameState,
            playedCard,
            playerId
        })
    }

    return (
        <div className={"hand-ui"}>
            <button className={"play-button"} disabled={selectedHandIndices.length !== 1}
                    onClick={handlePlayCard}>Play
            </button>
            <button className={"end-turn-button"}
                    onClick={() => playerFinishedEvent(null)}>End turn
            </button>
            {/*<button className={"combine-button"} disabled={selectedHandIndices.length !== 2}*/}
            {/*        onClick={() => console.log("Combine")}>Combine*/}
            {/*</button>*/}
        </div>
    );
}

export default HandUI;