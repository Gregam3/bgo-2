import React, {useEffect} from "react";
import "./styles/EventPanel.css";
import {INFINITE_EVENT_DURATION} from "../common/classes/GameEvent";
import {GameEventType} from "../common/classes/GameEventType";

function EventPanel({currentEvent, playerId,  playerFinishedEvent, gameState}) {
    useEffect(() => {
        if (!currentEvent) return;
        if (currentEvent.eventDurationMs === INFINITE_EVENT_DURATION || !currentEvent.eventDurationMs) return;

        setTimeout(() => {
            console.log(`Moving to next event after ${currentEvent.eventDurationMs}ms`);
            playerFinishedEvent();
        }, currentEvent.eventDurationMs);
    }, [currentEvent]);

    if (!currentEvent) return null;

    return (
        <div className={"event-panel-container"}>
            {currentEvent && <div className={"current-event-container"}>
                {GameEventType.GAME_EVENT_TYPES[currentEvent.name]
                    .render(currentEvent.eventData, gameState, playerId, playerFinishedEvent)}
            </div>}
        </div>
    );
}

export default EventPanel;