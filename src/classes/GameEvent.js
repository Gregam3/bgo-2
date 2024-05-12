export const INFINITE_EVENT_DURATION = -1;

class GameEvent {
    constructor(playerId, eventType, eventData, eventDurationMs) {
        this.playerId = playerId;
        this.eventType = eventType;
        this.eventData = eventData
        this.eventDurationMs = eventDurationMs || INFINITE_EVENT_DURATION;
    }
}

export {GameEvent};