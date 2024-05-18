const eventSequences = {
    PLAYERS_JOINING: {
        events: [
            {
                name: "WAIT_FOR_PLAYERS"
            }
        ],
        nextEventSequence: "FIRST_TURN"
    },
    FIRST_TURN: {
        events: [
            {
                name: "DRAFT_DECK"
            },
            {
                name: "DRAW_CARD",
                repeat: 3
            }
        ],
        isSimultaneous: true,
        nextEventSequence: "PLAYER_TURN"
    },
    PLAYER_TURN: {
        events: [
            {
                name: "DRAW_CARD"
            },
            {
                name: "PLAY_CARD"
            }
        ],
        isSimultaneous: false,
        allPlayers: true,
        nextEventSequence: "PLAYER_TURN"
    }
};

class GameEventLoop {
    constructor() {
        this.currentSequence = "PLAYERS_JOINING";
        this.currentEventIndex = 0;
        this.currentEventType = this.getCurrentEventType();
    }

    getCurrentEventType() {
        const sequence = eventSequences[this.currentSequence];

        let eventType = sequence.events[this.currentEventIndex];
        console.log("Current Sequence", eventType);
        this.currentEventType = eventType
        return eventType;
    }

    getNextEvent(gameState) {
        const sequence = eventSequences[this.currentSequence];
        this.currentEventIndex += 1;
        if (this.currentEventIndex >= sequence.events.length) {
            this.currentSequence = sequence.nextEventSequence;
            this.currentEventIndex = 0;
        }
        gameState.players.forEach(player => {
            player.currentTurnFinished = false;
        });
        return this.getCurrentEventType();
    }

    finishEvent(playerId, gameState) {
        const currentPlayer = this.findPlayer(playerId, gameState);
        currentPlayer.currentTurnFinished = true;
    }

    findPlayer(playerId, gameState) {
        return gameState.players.find(player => player.id === parseInt(playerId));
    }

    isEventFinished(gameState) {
        if (gameState && gameState.players) return false;
        console.log("Checking if event is finished", gameState.players.every(player => player.currentTurnFinished));
        return gameState.players.every(player => player.currentTurnFinished);
    }
}

module.exports = GameEventLoop;
