const DEFAULT_EVENT_DURATION = 3000;

class GameEvent {
    constructor(playerId, eventType, eventData, eventDurationMs) {
        this.playerId = playerId;
        this.eventType = eventType;
        this.eventData = eventData
        this.eventDurationMs = eventDurationMs || DEFAULT_EVENT_DURATION;
    }
}

export {GameEvent};