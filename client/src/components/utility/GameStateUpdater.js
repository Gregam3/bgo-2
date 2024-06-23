/*
 * Inside this class we should add *all* the functions that update the game state.
 *
 * This allows for consistent state updates using the same precise methods, no reuse and possibly even allows ai
 * to write some basic cards and events.
 */
let axios;

if (typeof window !== 'undefined') {
    // React environment
    import('axios').then(module => {
        axios = module.default;
    });
} else {
    // Node.js environment
    axios = require('axios');
}

const POST_RESULT_STRATEGIES = {
    'ONLY_POST': 0,
    'RETURN_NEW_STATE': 1,
    'POST_AND_RETURN': 2
}

class GameStateUpdater {
    static poster = new GameStateUpdater(POST_RESULT_STRATEGIES.ONLY_POST);
    static returner = new GameStateUpdater(POST_RESULT_STRATEGIES.RETURN_NEW_STATE);
    static postAndReturn = new GameStateUpdater(POST_RESULT_STRATEGIES.POST_AND_RETURN);

    constructor(postStrategy) {
        this.postResult = postStrategy;
    }

    postUpdateGameState(newGameState) {
        axios.post("http://localhost:3001/update-game-state", {newGameState})
    }

    addPlayerCardToDeck(gameState, playerId, newCard) {
        let playerIndex = gameState.players.findIndex(player => player.id === playerId);
        if (playerIndex === -1) {
            throw new Error(`Player with id ${playerId} not found`);
        }
        let updatedPlayers = [...gameState.players];
        updatedPlayers[playerIndex] = {
            ...updatedPlayers[playerIndex],
            deck: [...updatedPlayers[playerIndex].deck, newCard]
        };

        return this.handGameStateUpdate({...gameState, players: updatedPlayers});
    }

    moveCardFromPlayerHandToDeck = (gameState, playerId, playedCard) => {
        const player = gameState.players.find(player => player.id === playerId);
        const newPlayerHand = player.hand.filter(card => card.uniqueId !== playedCard.uniqueId);
        playedCard.played = false;
        const newDeck = [...player.deck, playedCard];
        player.hand = newPlayerHand;
        player.deck = newDeck;

        return this.handGameStateUpdate(gameState);
    }

    handGameStateUpdate(gameState) {
        switch (this.postResult) {
            case POST_RESULT_STRATEGIES.ONLY_POST:
                this.postUpdateGameState(gameState);
                break;
            case POST_RESULT_STRATEGIES.RETURN_NEW_STATE:
                return gameState;
            case POST_RESULT_STRATEGIES.POST_AND_RETURN:
                this.postUpdateGameState(gameState);
                return gameState;
            default:
                throw new Error("Invalid post result strategy");
        }
    }

    addSelectedCardToDeck(gameState, playerId, selectedCard) {
        const clonedSelectedCard = {...selectedCard};
        clonedSelectedCard.uniqueId = Math.random().toString(36);
        clonedSelectedCard.played = false;
        const playerIndex = gameState.players.findIndex(player => player.id === playerId);
        if (playerIndex === -1) {
            throw new Error(`Player with id ${playerId} not found`);
        }

        const updatedPlayers = [...gameState.players];
        updatedPlayers[playerIndex] = {
            ...updatedPlayers[playerIndex],
            deck: [...updatedPlayers[playerIndex].deck, clonedSelectedCard]
        };

        return this.handGameStateUpdate({...gameState, players: updatedPlayers});
    }

    drawCardFromDeck(gameState, playerId) {
        let playerIndex = gameState.players.findIndex(player => player.id === playerId);
        if (playerIndex === -1) {
            throw new Error(`Player with id ${playerId} not found`);
        }
        if (gameState.players[playerIndex].deck.length === 0) return gameState;

        const newGameState = {...gameState};
        newGameState.players[playerIndex].hand = [...gameState.players[playerIndex].hand, gameState.players[playerIndex].deck[0]];
        newGameState.players[playerIndex].deck = gameState.players[playerIndex].deck.slice(1);

        return this.handGameStateUpdate(newGameState);
    }

    drawCardsFromDeck(gameState, playerId, repeatTimes = 1) {
        let newGameState;
        for (let i = 0; i < repeatTimes; i++) {
            newGameState = GameStateUpdater.returner.drawCardFromDeck(gameState, playerId);
        }

        return this.handGameStateUpdate(newGameState);
    }

    updateCard(gameState, playerId, uniqueCardId, cardChangedEntries) {
        const newPlayerHand = gameState.players.find(player => player.id === playerId).hand.map(card => {
            if (card.uniqueId === uniqueCardId) {
                return {...card, ...cardChangedEntries};
            }
            return card;
        });
        const updatedPlayers = gameState.players.map(player => {
            if (player.id === playerId) {
                return {...player, hand: newPlayerHand};
            }
            return player;
        });

        return this.handGameStateUpdate({...gameState, players: updatedPlayers});
    }

    playCard = (gameState, playerId, uniqueCardId) => {
        // Change card played status to true, this will trigger our animation
        const cardPlayedGameState = GameStateUpdater.postAndReturn.updateCard(gameState, playerId, uniqueCardId, {played: true});
        // Send to server
        axios.post("http://localhost:3001/play-card", {
            playedCard: cardPlayedGameState.players.find(player => player.id === playerId).hand.find(card => card.uniqueId === uniqueCardId),
            playerId
        });
    }
}


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    // Node.js environment
    module.exports = GameStateUpdater;
} else {
    // React environment
    window.GameStateUpdater = GameStateUpdater;
}