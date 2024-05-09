import React from "react";
import "./styles/HandUI.css";
import {GameEventTypes} from "../classes/GameEventTypes";
import {GameEvent} from "../classes/GameEvent";

function HandUI({playerHand, selectedHandIndices, setSelectedHandIndices, addEvent, playerId}) {

    function handlePlayCard() {
        setSelectedHandIndices([]);
        let playedCard = playerHand[selectedHandIndices[0]];
        playedCard.played = true;
        addEvent(new GameEvent(playerId, GameEventTypes.PLAY_CARD, playedCard, 1500))
    }

    return (
        <div className={"hand-ui"}>
            <button className={"play-button"} disabled={selectedHandIndices.length !== 1}
                    onClick={handlePlayCard}>Play
            </button>
            <button className={"combine-button"} disabled={selectedHandIndices.length !== 2}
                    onClick={() => console.log("Combine")}>Combine
            </button>
        </div>
    );
}

export default HandUI;