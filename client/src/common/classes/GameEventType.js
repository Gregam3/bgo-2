import CardDisplay from "../../components/CardDisplay";
import OpenPackEvent from "../../components/events/OpenPackEvent";
import DraftDeckEvent from "../../components/events/DraftDeckEvent";
import DrawCardEvent from "../../components/events/DrawCardEvent";
import WaitingForPlayers from "../../components/events/WaitingForPlayers";
import {PlayedCardSpace} from "../../components/events/PlayedCardSpace";

export class GameEventType {
    constructor(name, description, renderFunction) {
        this.name = name;
        this.description = description;
        this.render = renderFunction;
    }

    static GAME_EVENT_TYPES = {
        WAIT_FOR_PLAYERS: new GameEventType("WAIT_FOR_PLAYERS", "Waiting for players to join",
            (eventData, gameState, playerId, playerFinishedEvent) =>
                <WaitingForPlayers gameState={gameState} playerFinishedEvent={playerFinishedEvent}/>),
        DRAW_CARD: new GameEventType("DRAW_CARD", "Draw a card",
            (eventData, gameState, playerId, playerFinishedEvent) =>
                <DrawCardEvent eventData={eventData}
                               gameState={gameState}
                               playerId={playerId}
                               playerFinishedEvent={playerFinishedEvent}/>),
        CHOOSE_CARDS_TO_PLAY: new GameEventType("CHOOSE_CARD_TO_PLAY", "Choose a card to play",
            (eventData, gameState, playerId, playerFinishedEvent) =>
                <PlayedCardSpace
                    gameState={gameState}
                    playerId={playerId}
                    playerHand={gameState.players.find(player => player.id === playerId).hand}/>),
        PLAY_CARD: new GameEventType("PLAY_CARD", "Play a card from your hand",
            (eventData, gameState, playerId, playerFinishedEvent) => <CardDisplay card={eventData}/>),
        OPEN_PACK: new GameEventType("OPEN_PACK", "Open a pack of cards",
            (eventData, gameState, playerId, playerFinishedEvent) =>
                <OpenPackEvent packData={eventData}
                               gameState={gameState}
                               playerId={playerId}
                               playerFinishedEvent={playerFinishedEvent}/>),
        DRAFT_DECK: new GameEventType("DRAFT_DECK", "Draft a deck of cards",
            (eventData, gameState, playerId, playerFinishedEvent) =>
                <DraftDeckEvent draftData={eventData}
                                gameState={gameState}
                                playerId={playerId}
                                playerFinishedEvent={playerFinishedEvent}
                                numberOfPacksToOpen={5}
                />)
    }
}