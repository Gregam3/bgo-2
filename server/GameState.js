const GameEventLoop = require('./events/GameEventLoop');

class GameState {
    constructor() {
        this.data = {
            players: [],
            gameEventLoop: new GameEventLoop()
        }
    }

    addPlayer(uuid) {
        let existingPlayer = this.data.players.find(player => player.uuid === uuid);
        if (existingPlayer) {
            console.log(`Player with uuid ${uuid} already exists`);
            return existingPlayer.id;
        }

        let newId = this.data.players.length + 1;
        console.log(`Adding player ${newId}`);
        this.data.players.push({
            id: newId,
            uuid: uuid,
            currentTurnFinished: false,
            hand: [],
            deck: [],
        });

        return newId;
    }
}

module.exports = GameState;
