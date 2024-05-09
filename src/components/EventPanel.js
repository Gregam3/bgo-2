import React, {useEffect} from "react";
import "./styles/EventPanel.css";

function EventPanel({currentEvent, removePlayerCard, moveToNextEvent}) {
    useEffect(() => {
        console.log("Current Event", currentEvent);
        if (currentEvent && currentEvent.eventType.name === "PLAY_CARD") {
            removePlayerCard(currentEvent.eventData);
        }
    }, [currentEvent]);

    useEffect(() => {
        if (currentEvent === undefined) return;
        setTimeout(() => {
            moveToNextEvent();
        }, currentEvent.eventDurationMs);
    }, [currentEvent]);

    return (
        <div className={"event-panel-container"}>
            {currentEvent && <div className={"current-event-container"}>
                {currentEvent.eventType.render(currentEvent.eventData)}
            </div>}
        </div>
    );
}

export default EventPanel;