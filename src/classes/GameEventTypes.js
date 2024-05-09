import {GameEventType} from "./GameEventType";
import Card, {PregeneratedCard} from "../components/Card";

export const GameEventTypes = {
    PLAY_CARD: new GameEventType("PLAY_CARD", "Play a card from your hand",
        eventData => <Card card={eventData}/>,
    ),
}