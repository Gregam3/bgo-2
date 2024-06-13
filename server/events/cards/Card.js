// Card.js
class Card {
    constructor(cardId, cardName, imagePath, cardType, cardQuality, description, gameStateEffect) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.imagePath = imagePath;
        this.cardType = cardType;
        this.cardQuality = cardQuality;
        this.description = description;
        this.gameStateEffect = gameStateEffect;
    }
}

module.exports = Card;
