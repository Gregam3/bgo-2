import React from "react";
import "./styles/HandUI.css";
import {GameEventTypes} from "../classes/GameEventTypes";
import {GameEvent} from "../classes/GameEvent";

function HandUI({playerHand, selectedHandIndices, addEvent, playerId}) {

    return (
        <div className={"hand-ui"}>
            <button className={"play-button"} disabled={selectedHandIndices.length !== 1}
                    onClick={() => addEvent(new GameEvent(playerId, GameEventTypes.PLAY_CARD, playerHand[selectedHandIndices[0]]))}>Play
            </button>
            <button className={"combine-button"} disabled={selectedHandIndices.length !== 2}
                    onClick={() => console.log("Combine")}>Combine
            </button>
        </div>
    );
}

export default HandUI;