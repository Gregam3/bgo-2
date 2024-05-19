const isNode = typeof window === 'undefined';
let GameEventTypes;

if (isNode) {
    GameEventTypes = require('./GameEventTypesServer').GameEventTypesServer;
} else {
    GameEventTypes = require('./GameEventType').GameEventType;
}

const INFINITE_EVENT_DURATION = -1;

class GameEvent {
    constructor(playerId, eventType, eventData, eventDurationMs) {
        this.playerId = playerId;
        this.eventType = eventType;
        this.eventData = eventData;
        this.eventDurationMs = eventDurationMs || INFINITE_EVENT_DURATION;
    }
}

module.exports = { GameEvent, INFINITE_EVENT_DURATION };

// For frontend compatibility
if (!isNode) {
    window.GameEvent = GameEvent;
}
