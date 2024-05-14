import {GameEventType} from "../../common/classes/GameEventType";
import Card from "../Card";
import OpenPackEvent from "./OpenPackEvent";
import DraftDeckEvent from "./DraftDeckEvent";
import DrawCardEvent from "./DrawCardEvent";

export const GameEventTypesClient = {
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