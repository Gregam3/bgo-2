import Card from "../../components/Card";
import OpenPackEvent from "../../components/events/OpenPackEvent";
import DraftDeckEvent from "../../components/events/DraftDeckEvent";
import DrawCardEvent from "../../components/events/DrawCardEvent";
import WaitingForPlayers from "../../components/events/WaitingForPlayers";

export class GameEventType {
    constructor(name, description, renderFunction) {
        this.name = name;
        this.description = description;
        this.render = renderFunction;
    }

    static GAME_EVENT_TYPES = {
        WAIT_FOR_PLAYERS: new GameEventType("WAIT_FOR_PLAYERS", "Waiting for players to join",
            (eventData, gameState, setGameState, playerId, playerFinishedEvent) =>
                <WaitingForPlayers gameState={gameState} playerFinishedEvent={playerFinishedEvent}/>),
        DRAW_CARD: new GameEventType("DRAW_CARD", "Draw a card",
            (eventData, gameState, setGameState, playerId, playerFinishedEvent) =>
                <DrawCardEvent gameState={gameState} setGameState={setGameState}
                               playerId={playerId}
                               playerFinishedEvent={playerFinishedEvent}/>),
        PLAY_CARD: new GameEventType("PLAY_CARD", "Play a card from your hand",
            (eventData, gameState, setGameState, playerId, playerFinishedEvent) => <Card card={eventData}/>),
        OPEN_PACK: new GameEventType("OPEN_PACK", "Open a pack of cards",
            (eventData, gameState, setGameState, playerId, playerFinishedEvent) =>
                <OpenPackEvent packData={eventData}
                               gameState={gameState} setGameState={setGameState}
                               playerId={playerId}
                               playerFinishedEvent={playerFinishedEvent}/>),
        DRAFT_DECK: new GameEventType("DRAFT_DECK", "Draft a deck of cards",
            (eventData, gameState, setGameState, playerId, playerFinishedEvent) =>
                <DraftDeckEvent draftData={eventData}
                                gameState={gameState} setGameState={setGameState}
                                playerId={playerId}
                                playerFinishedEvent={playerFinishedEvent}
                                numberOfPacksToOpen={5}
                />)
    }
}