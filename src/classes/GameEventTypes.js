import {GameEventType} from "./GameEventType";
import {PregeneratedCard} from "../components/Card";

export const GameEventTypes = {
    PLAY_CARD: new GameEventType("Play Card", "Play a card from your hand",
        eventData => <PregeneratedCard card={eventData}/>,
    ),
}