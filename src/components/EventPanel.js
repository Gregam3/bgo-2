import React from "react";
import "./styles/EventPanel.css";

function EventPanel({currentEvent}) {
    console.log("EventPanel", currentEvent);
    return (
        <div className={"event-panel-container"}>
            <h1>Event Panel</h1>
            {currentEvent && <div className={"current-event-container"}>
                {currentEvent.eventType.render(currentEvent.eventData)}
            </div>}
        </div>
    );
}

export default EventPanel;