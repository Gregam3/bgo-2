/*
 * Inside this class we should add *all* the functions that update the game state.
 *
 * This allows for consistent state updates using the same precise methods, no reuse and possibly even allows ai
 * to write some basic cards and events.
 */
export default class GameStateUpdater {
    static addPlayerCardToDeck = (gameState, newCard) => {
        let newPlayerDeck = gameState.playerDeck;
        newPlayerDeck.push(newCard);
        return {...gameState, playerDeck: newPlayerDeck};
    }

    static removePlayerCardFromHand = (gameState, cardToDelete) => {
        let newPlayerHand = gameState.playerHand.filter(card => card.id !== cardToDelete.id);
        return {...gameState, playerHand: newPlayerHand};
    }

    static addSelectedCardToDeck(gameState, selectedCard) {
        const newGameState = {...gameState};
        newGameState.playerDeck = [...newGameState.playerDeck, selectedCard];
        return newGameState;
    }

    static drawCardToHand(gameState, selectedCard) {
        const newGameState = {...gameState};
        newGameState.playerHand = [...newGameState.playerHand, selectedCard];
        return newGameState;
    }

}

