import {GameEventType} from "./GameEventType";
import Card, {PregeneratedCard} from "../components/Card";
import OpenPackEvent from "../components/events/OpenPackEvent";

export const GameEventTypes = {
    PLAY_CARD: new GameEventType("PLAY_CARD", "Play a card from your hand", eventData => <Card card={eventData}/>),
    OPEN_PACK: new GameEventType("OPEN_PACK", "Open a pack of cards", eventData => <OpenPackEvent packData={eventData}/>),
}