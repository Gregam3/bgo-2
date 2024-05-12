import {GameEventType} from "./GameEventType";
import Card from "../components/Card";
import OpenPackEvent from "../components/events/OpenPackEvent";
import DraftDeckEvent from "../components/events/DraftDeckEvent";
import DrawCardEvent from "../components/events/DrawCardEvent";

export const GameEventTypes = {
    DRAW_CARD: new GameEventType("DRAW_CARD", "Draw a card", (eventData, gameState, setGameState, moveToNextEvent) =>
        <DrawCardEvent gameState={gameState} setGameState={setGameState} moveToNextEvent={moveToNextEvent}/>
    ),
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
                        numberOfPacksToOpen={2}
        />
    ),
}