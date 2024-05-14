const isNode = typeof window === 'undefined';
let GameEventTypes, TEST_PACK;

if (isNode) {
    // We're in a Node.js environment
    GameEventTypes = require('./GameEventTypesServer').GameEventTypesServer;
} else {
    // We're in a browser environment
    GameEventTypes = require('../../components/events/GameEventTypesClient').GameEventTypesClient;
}

const INFINITE_EVENT_DURATION = -1;

class GameEvent {
    constructor(playerId, eventType, eventData, eventDurationMs) {
        this.playerId = playerId;
        this.eventType = eventType;
        this.eventData = eventData;
        this.eventDurationMs = eventDurationMs || INFINITE_EVENT_DURATION;
    }

    static TEST_DRAFT = new GameEvent(0, GameEventTypes.DRAFT_DECK, TEST_PACK);
    static TEST_DRAW = new GameEvent(0, GameEventTypes.DRAW_CARD, TEST_PACK);
}

module.exports = { GameEvent };

// For frontend compatibility
if (!isNode) {
    window.GameEvent = GameEvent;
}
