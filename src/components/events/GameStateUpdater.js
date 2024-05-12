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
}

