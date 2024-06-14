
const GameEvent = require("../../client/src/components/events/framework/GameEvent");
const DiceCards = require("./cards/DiceCards");

const eventSequences = {
    PLAYERS_JOINING: {
        events: [new GameEvent("WAIT_FOR_PLAYERS")],
        nextEventSequence: "FIRST_TURN"
    },
    FIRST_TURN: {
        events: [
            new GameEvent("DRAFT_DECK", {
                possibleCards: [DiceCards.D4, DiceCards.D6, DiceCards.D8, DiceCards.D10],
                cardCountToChoose: 1,
                cardCountShown: 3
            }),
            new GameEvent("DRAW_CARD", {repeatTimes: 3}),
        ],
        nextEventSequence: "PLAYER_TURN"
    },
    PLAYER_TURN: {
        events: [new GameEvent("DRAW_CARD"), new GameEvent("CHOOSE_CARDS_TO_PLAY", {}, false)],
        allPlayers: true,
        nextEventSequence: "PLAYER_TURN"
    },
};

class GameEventLoop {
    constructor() {
        this.data = {
            currentSequence: "PLAYERS_JOINING",
            currentEventIndex: 0
        };
        this.data.currentEvent = this.getCurrentEvent();
        this.data.playerTurnIndex = 0;
    }

    getCurrentEvent() {
        const sequence = eventSequences[this.data.currentSequence];

        if (this.data.currentEventIndex >= sequence.events.length) {
            this.data.currentSequence = sequence.nextEventSequence;
            this.data.currentEventIndex = 0;
        }

        const event = eventSequences[this.data.currentSequence].events[this.data.currentEventIndex];
        console.log("Current Sequence", event);
        this.data.currentEvent = event;
        return event;
    }

    moveToNextEvent(gameState) {
        const sequence = eventSequences[this.data.currentSequence];
        this.data.currentEventIndex += 1;

        if (this.data.currentEvent.isSimultaneous === false) {
            if (this.data.playerTurnIndex + 1 >= gameState.data.players.length) {
                this.data.playerTurnIndex = 0;
            } else {
                this.data.playerTurnIndex += 1;
                return;
            }
        }

        if (this.data.currentEventIndex >= sequence.events.length) {
            this.data.currentSequence = sequence.nextEventSequence;
            this.data.currentEventIndex = 0;
        }

        gameState.data.players.forEach(player => {
            player.currentTurnFinished = false;
        });

        this.data.currentEvent = this.getCurrentEvent();
    }

    finishEvent(playerId, gameState) {
        const currentPlayer = this.findPlayer(playerId, gameState);
        currentPlayer.currentTurnFinished = true;
    }

    findPlayer(playerId, gameState) {
        return gameState.data.players.find(player => player.id === parseInt(playerId));
    }

    isEventFinished(gameState) {
        if (!gameState || !gameState.data.players) return false;
        console.log("Checking if event is finished", gameState.data.players.every(player => player.currentTurnFinished));
        let everyPlayerFinished = gameState.data.players.every(player => player.currentTurnFinished);
        if (everyPlayerFinished) {
            gameState.data.players.forEach(player => {
                player.currentTurnFinished = false;
            });
        }
        return everyPlayerFinished;
    }
}

module.exports = GameEventLoop;
