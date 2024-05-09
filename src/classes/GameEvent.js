const DEFAULT_EVENT_DURATION = 3000;

class GameEvent {
    constructor(playerId, eventType, eventData) {
        this.playerId = playerId;
        this.eventType = eventType;
        this.eventDurationMs = DEFAULT_EVENT_DURATION;
        this.eventData = eventData
    }
}

export {GameEvent};