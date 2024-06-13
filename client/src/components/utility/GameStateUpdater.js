/*
 * Inside this class we should add *all* the functions that update the game state.
 *
 * This allows for consistent state updates using the same precise methods, no reuse and possibly even allows ai
 * to write some basic cards and events.
 */
class GameStateUpdater {
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
        return {...gameState, players: updatedPlayers};
    }

    static moveCardFromPlayerHandToDeck = (gameState, playerId, playedCard) => {
        const player = gameState.players.find(player => player.id === playerId);
        const newPlayerHand = player.hand.filter(card => card.uniqueId !== playedCard.uniqueId);
        playedCard.played = false;
        const newDeck = [...player.deck, playedCard];
        player.hand = newPlayerHand;
        player.deck = newDeck;

        return {...gameState};
    }

    static addSelectedCardToDeck(gameState, playerId, selectedCard) {
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

        return {...gameState, players: updatedPlayers};
    }

    static drawCardFromDeck(gameState, playerId) {
        let playerIndex = gameState.players.findIndex(player => player.id === playerId);
        if (playerIndex === -1) {
            throw new Error(`Player with id ${playerId} not found`);
        }
        if (gameState.players[playerIndex].deck.length === 0) return gameState;

        const newGameState = {...gameState};
        newGameState.players[playerIndex].hand = [...gameState.players[playerIndex].hand, gameState.players[playerIndex].deck[0]];
        newGameState.players[playerIndex].deck = gameState.players[playerIndex].deck.slice(1);
        return newGameState;
    }

    static drawCardsFromDeck(gameState, playerId, repeatTimes = 1) {
        let newGameState = {...gameState};
        for (let i = 0; i < repeatTimes; i++) {
            newGameState = GameStateUpdater.drawCardFromDeck(newGameState, playerId);
        }
        return newGameState;
    }

    static updateCard(gameState, playerId, uniqueCardId, cardChangedEntries) {
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

        return {...gameState, players: updatedPlayers};
    }
}

if (typeof module !== 'undefined') {
    module.exports = GameStateUpdater;
}