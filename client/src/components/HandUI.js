import React from "react";
import "./styles/HandUI.css";
import axios from "axios";
import {gameStateUpdater} from "../App";
import {CardAnimationTypes} from "./animations/CardAnimationType";

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
        gameStateUpdater.playCard(gameState, playerId, playerHand[selectedHandIndices[0]].uniqueId);

        setTimeout(() => {
            axios.post(`http://localhost:3001/play-card`, {
                clientGameState: gameState,
                playedCard: playerHand[selectedHandIndices[0]],
                playerId
            })
        }, CardAnimationTypes[playerHand[selectedHandIndices[0]].cardId].timeoutMs);
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