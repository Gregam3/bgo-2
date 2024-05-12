import {GameEventTypes} from "./GameEventTypes";
import {TEST_PACK} from "../components/utility/DevUtils";

export const INFINITE_EVENT_DURATION = -1;

class GameEvent {
    constructor(playerId, eventType, eventData, eventDurationMs) {
        this.playerId = playerId;
        this.eventType = eventType;
        this.eventData = eventData
        this.eventDurationMs = eventDurationMs || INFINITE_EVENT_DURATION;
    }

    static TEST_DRAFT = new GameEvent(0, GameEventTypes.DRAFT_DECK, TEST_PACK)
    static TEST_DRAW = new GameEvent(0, GameEventTypes.DRAW_CARD, TEST_PACK)
}

export {GameEvent};