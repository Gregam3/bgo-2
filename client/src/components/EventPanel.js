import React, {useEffect} from "react";
import "./styles/EventPanel.css";
import {INFINITE_EVENT_DURATION} from "../common/classes/GameEvent";
import {GameEventTypesClient} from "./events/framework/GameEventTypesClient";

function getClientGameEventType(eventType) {
    console.log("Event Type", eventType);
    return GameEventTypesClient[eventType];
}

function EventPanel({currentEvent, removePlayerCard, moveToNextEvent, gameState, setGameState}) {
    useEffect(() => {
        if (currentEvent && currentEvent.name === "PLAY_CARD") {
            removePlayerCard(currentEvent.eventData);
        }
    }, [currentEvent]);

    useEffect(() => {
        if (!currentEvent) return;
        if (currentEvent.eventDurationMs === INFINITE_EVENT_DURATION) return;

        setTimeout(() => {
            console.log(`Moving to next event after ${currentEvent.eventDurationMs}ms`);
            moveToNextEvent();
        }, currentEvent.eventDurationMs);
    }, [currentEvent]);

    if (!currentEvent) return null;

    console.log("Current Event", currentEvent);

    return (
        <div className={"event-panel-container"}>
            {currentEvent && <div className={"current-event-container"}>
                {getClientGameEventType(currentEvent.name).render(currentEvent.eventData, gameState, setGameState, moveToNextEvent)}
            </div>}
        </div>
    );
}

export default EventPanel;