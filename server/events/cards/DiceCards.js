// DiceCards.js
const Card = require("./Card");

class DiceCards {
    static gameStateEffect(gameState, playerId, diceMaxValue) {
        const newGameState = { ...gameState };
        const player = newGameState.players.find(player => player.id === playerId);
        const diceRoll = Math.floor(Math.random() * diceMaxValue) + 1;

        player.previousDiceRoll = diceRoll;
        player.tile += diceRoll;

        return newGameState;
    }

    static D100 = new Card(
        "D100",
        "D100",
        "/images/dice-icons/d100-icon.png",
        "roll",
        "LEGENDARY",
        "Roll a 100 sided die for movement",
        (gameState, playerId) => DiceCards.gameStateEffect(gameState, playerId, 100)
    );
    static D20 = new Card(
        "D20",
        "D20",
        "/images/dice-icons/d20-icon.png",
        "roll",
        "EPIC",
        "Roll a 20 sided die for movement",
        (gameState, playerId) => DiceCards.gameStateEffect(gameState, playerId, 20)
    );
    static D12 = new Card(
        "D12",
        "D12",
        "/images/dice-icons/d12-icon.png",
        "roll",
        "RARE",
        "Roll a 12 sided die for movement",
        (gameState, playerId) => DiceCards.gameStateEffect(gameState, playerId, 12)
    );
    static D10 = new Card(
        "D10",
        "D10",
        "/images/dice-icons/d10-icon.png",
        "roll",
        "RARE",
        "Roll a 10 sided die for movement",
        (gameState, playerId) => DiceCards.gameStateEffect(gameState, playerId, 10)
    );
    static D8 = new Card(
        "D8",
        "D8",
        "/images/dice-icons/d8-icon.png",
        "roll",
        "UNCOMMON",
        "Roll an 8 sided die for movement",
        (gameState, playerId) => DiceCards.gameStateEffect(gameState, playerId, 8)
    );
    static D6 = new Card(
        "D6",
        "D6",
        "/images/dice-icons/d6-icon.png",
        "roll",
        "COMMON",
        "Roll a 6 sided die for movement",
        (gameState, playerId) => DiceCards.gameStateEffect(gameState, playerId, 6)
    );
    static D4 = new Card(
        "D4",
        "D4",
        "/images/dice-icons/d4-icon.png",
        "roll",
        "COMMON",
        "Roll a 4 sided die for movement",
        (gameState, playerId) => DiceCards.gameStateEffect(gameState, playerId, 4)
    );

    static ALL_CARDS = [
        DiceCards.D100,
        DiceCards.D20,
        DiceCards.D12,
        DiceCards.D10,
        DiceCards.D8,
        DiceCards.D6,
        DiceCards.D4
    ];
}

module.exports = DiceCards;
