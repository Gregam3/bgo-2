// GameStateManager.js

const _ = require('lodash');
const WebSocket = require("ws");

class GameStateManager {
    constructor(gameState, wss) {
        this.queue = [];
        this.gameState = gameState;
        this.isProcessing = false;
        this.wss = wss;
    }

    addUpdate(update) {
        this.queue.push(update);
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const update = this.queue.shift();
            await this.applyUpdate(update);
        }

        this.isProcessing = false;
    }

    async applyUpdate(update) {
        this.gameState.data = this.mergeGameStateUpdate(this.gameState.data, update);

        await this.broadcastGameStateUpdate('Queue update');
    }

    mergeGameStateUpdate(currentState, update) {
        return _.mergeWith({}, currentState, update, (objValue, srcValue, key, object, source, stack) => {
            if (_.isArray(objValue)) {
                return srcValue;
            }
        });
    }

    async broadcastGameStateUpdate(triggerName) {
        console.log(`${new Date()} - Broadcasting game state update for '${triggerName}'`)
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(this.gameState.data));
            }
        });
    }
}

module.exports = GameStateManager;