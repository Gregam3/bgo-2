/*
 * Inside this class we should add *all* the functions that update the game state.
 *
 * This allows for consistent state updates using the same precise methods, no reuse and possibly even allows ai
 * to write some basic cards and events.
 */
export default class GameStateUpdater {
    static addPlayerCardToDeck(gameState, playerId, newCard) {
        let playerIndex = gameState.players.findIndex(player => player.id === playerId);
        if (playerIndex === -1) {
            throw new Error(`Player with id ${playerId} not found`);
        }
        let updatedPlayers = [...gameState.players];
        updatedPlayers[playerIndex] = {
            ...updatedPlayers[playerIndex],
            deck: [...updatedPlayers[playerIndex].deck, newCard]
        };
        return { ...gameState, players: updatedPlayers };
    }

    static removePlayerCardFromHand = (gameState, cardToDelete) => {
        let newPlayerHand = gameState.playerHand.filter(card => card.id !== cardToDelete.id);
        return {...gameState, playerHand: newPlayerHand};
    }

    static addSelectedCardToDeck(gameState, playerId, selectedCard) {
        const playerIndex = gameState.players.findIndex(player => player.id === playerId);
        if (playerIndex === -1) {
            throw new Error(`Player with id ${playerId} not found`);
        }

        const updatedPlayers = [...gameState.players];
        updatedPlayers[playerIndex] = {
            ...updatedPlayers[playerIndex],
            deck: [...updatedPlayers[playerIndex].deck, selectedCard]
        };

        return { ...gameState, players: updatedPlayers };
    }

    static drawCardFromDeck(gameState, playerId) {
        let playerIndex = gameState.players.findIndex(player => player.id === playerId);
        if (playerIndex === -1) {
            throw new Error(`Player with id ${playerId} not found`);
        }
        const newGameState = {...gameState};
        newGameState.players[playerIndex].hand = [...gameState.players[playerIndex].hand, gameState.players[playerIndex].deck[0]];
        newGameState.players[playerIndex].deck = gameState.players[playerIndex].deck.slice(1);
        return newGameState;
    }

    static drawCardsFromDeck(gameState, playerId, repeatTimes) {
        let newGameState = {...gameState};
        for (let i = 0; i < repeatTimes; i++) {
            newGameState = GameStateUpdater.drawCardFromDeck(newGameState, playerId);
        }
        return newGameState;
    }

}

