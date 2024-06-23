// Card.js
class Card {
    constructor(cardId, cardName, imagePath, cardType, cardQuality, description, gameStateEffect) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.imagePath = imagePath;
        this.cardType = cardType;
        this.cardQuality = cardQuality;
        this.description = description;
        // Params: gameState, playerId
        this.gameStateEffect = gameStateEffect;
    }

    invoke(gameStateData, playerId) {
        let newGameState = this.gameStateEffect(gameStateData, playerId);
        // Remove card from player's hand and add to deck
        let playerIndex = newGameState.players.findIndex(player => player.id === playerId);
        newGameState.players[playerIndex].hand = newGameState.players[playerIndex].hand.filter(card => card.cardId !== this.cardId);
        newGameState.players[playerIndex].deck.push(this);
        return newGameState;
    }
}

module.exports = Card;
