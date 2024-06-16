import React from "react";
import "./styles/HandUI.css";
import {GameEventType} from "../common/classes/GameEventType";
import {GameEvent} from "../common/classes/GameEvent";
import GameStateUpdater from "./utility/GameStateUpdater";
import axios from "axios";
import {gameStateUpdater} from "../App";

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

        // Play card, wait for animation, then call play-card endpoint
        gameStateUpdater.updateCard(gameState, playerId, playedCard.uniqueId, {played: true});

        setTimeout(() => {
            axios.post(`http://localhost:3001/play-card`, {
                clientGameState: gameState,
                playedCard,
                playerId
            })
        }, 20_000);
    }

    return (
        <div className={"hand-ui"}>
            <button className={"play-button"}
                    disabled={selectedHandIndices.length !== 1 || gameState.gameEventLoop.data.playerTurnIndex + 1 !== playerId}
                    onClick={handlePlayCard}>Play
            </button>
            <button className={"end-turn-button"}
                    disabled={gameState.gameEventLoop.data.playerTurnIndex + 1 !== playerId}
                    onClick={() => playerFinishedEvent(null)}>End turn
            </button>
            {/*<button className={"combine-button"} disabled={selectedHandIndices.length !== 2}*/}
            {/*        onClick={() => console.log("Combine")}>Combine*/}
            {/*</button>*/}
        </div>
    );
}

export default HandUI;