const GameEventLoop = require('./events/GameEventLoop');

class GameState {
    constructor() {
        this.players = [];
        this.gameEventLoop = new GameEventLoop();
    }

    addPlayer() {
        let newId = this.players.length + 1;
        console.log(`Adding player ${newId}`);
        this.players.push({
            id: newId,
            currentTurnFinished: false
        });

        return newId;
    }
}

module.exports = GameState;