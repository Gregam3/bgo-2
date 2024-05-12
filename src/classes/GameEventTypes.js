import {GameEventType} from "./GameEventType";
import Card from "../components/Card";
import OpenPackEvent from "../components/events/OpenPackEvent";
import DraftDeckEvent from "../components/events/DraftDeckEvent";

export const GameEventTypes = {
    PLAY_CARD: new GameEventType("PLAY_CARD", "Play a card from your hand", eventData => <Card card={eventData}/>),
    OPEN_PACK: new GameEventType("OPEN_PACK", "Open a pack of cards", (eventData, gameState, setGameState, moveToNextEvent) =>
        <OpenPackEvent packData={eventData}
                       gameState={gameState} setGameState={setGameState}
                       moveToNextEvent={moveToNextEvent}/>
    ),
    DRAFT_DECK: new GameEventType("DRAFT_DECK", "Draft a deck of cards", (eventData, gameState, setGameState, moveToNextEvent) =>
        <DraftDeckEvent draftData={eventData}
                        gameState={gameState} setGameState={setGameState}
                        moveToNextEvent={moveToNextEvent}
                        numberOfPacksToOpen={5}
        />
    ),
}