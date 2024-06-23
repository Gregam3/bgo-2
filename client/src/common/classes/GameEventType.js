import React from 'react';
import CardDisplay from "../../components/CardDisplay";
import OpenPackEvent from "../../components/events/OpenPackEvent";
import DraftDeckEvent from "../../components/events/DraftDeckEvent";
import WaitingForPlayers from "../../components/events/WaitingForPlayers";
import {PlayedCardSpace} from "../../components/events/PlayedCardSpace";
import GameStateUpdater from "../../utils/GameStateUpdater";

export class GameEventType {
    constructor(name, description, renderFunction = () => null, onStart = () => {}) {
        this.name = name;
        this.description = description;
        this.render = renderFunction;
        this.onStart = onStart;
    }

    static GAME_EVENT_TYPES = {
        WAIT_FOR_PLAYERS: {
            name: "WAIT_FOR_PLAYERS",
            description: "Waiting for players to join",
            render: (eventData, gameState, playerId, playerFinishedEvent) => (
                <WaitingForPlayers gameState={gameState} playerFinishedEvent={playerFinishedEvent}/>
            )
        },
        DRAW_CARD: {
            name: "DRAW_CARD",
            description: "Draw a card",
            render: () => {},
            onStart: (eventData, gameState, playerId) => GameStateUpdater.poster.drawCardsFromDeck(gameState, playerId, 3)
        },
        CHOOSE_CARDS_TO_PLAY: {
            name: "CHOOSE_CARD_TO_PLAY",
            description: "Choose a card to play",
            render: (eventData, gameState, playerId) => (
                <PlayedCardSpace
                    gameState={gameState}
                    playerId={playerId}
                    playerHand={gameState.players.find(player => player.id === playerId).hand}/>
            )
        },
        PLAY_CARD: {
            name: "PLAY_CARD",
            description: "Play a card from your hand",
            render: (eventData) => <CardDisplay card={eventData}/>
        },
        OPEN_PACK: {
            name: "OPEN_PACK",
            description: "Open a pack of cards",
            render: (eventData, gameState, playerId, playerFinishedEvent) => (
                <OpenPackEvent
                    packData={eventData}
                    gameState={gameState}
                    playerId={playerId}
                    playerFinishedEvent={playerFinishedEvent}/>
            )
        },
        DRAFT_DECK: {
            name: "DRAFT_DECK",
            description: "Draft a deck of cards",
            render: (eventData, gameState, playerId, playerFinishedEvent) => (
                <DraftDeckEvent
                    draftData={eventData}
                    gameState={gameState}
                    playerId={playerId}
                    playerFinishedEvent={playerFinishedEvent}
                    numberOfPacksToOpen={5}
                />
            )
        }
    };

    static getEventTypes() {
        return Object.keys(this.GAME_EVENT_TYPES);
    }
}