import React, {useEffect} from "react";
import "./styles/EventPanel.css";
import {INFINITE_EVENT_DURATION} from "../classes/GameEvent";

function EventPanel({currentEvent, removePlayerCard, moveToNextEvent, gameState}) {
    useEffect(() => {
        console.log("Current Event", currentEvent);
        if (currentEvent && currentEvent.eventType.name === "PLAY_CARD") {
            removePlayerCard(currentEvent.eventData);
        }
    }, [currentEvent]);

    useEffect(() => {
        if (currentEvent === undefined) return;
        if (currentEvent.eventDurationMs === INFINITE_EVENT_DURATION) return;

        setTimeout(() => {
            moveToNextEvent();
        }, currentEvent.eventDurationMs);
    }, [currentEvent]);

    return (
        <div className={"event-panel-container"}>
            {currentEvent && <div className={"current-event-container"}>
                {currentEvent.eventType.render(currentEvent.eventData, gameState)}
            </div>}
        </div>
    );
}

export default EventPanel;