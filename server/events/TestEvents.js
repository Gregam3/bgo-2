const { GameEvent } = require('../../client/src/common/classes/GameEvent');
const { GameEventTypesServer } = require('../../client/src/common/classes/GameEventTypesServer');
const cards = require("../../client/src/common/data/cards.json");

const TEST_PACK = {
    name: "Dice Pack",
    possibleCards: [
        cards.D4,
        cards.D6,
        cards.D8,
        cards.D10,
    ],
    cardCountToChoose: 1,
    cardCountShown: 3
}

const TestEvent = {
    TEST_DRAFT: new GameEvent(0, GameEventTypesServer.DRAFT_DECK, TEST_PACK),
    TEST_DRAW: new GameEvent(0, GameEventTypesServer.DRAW_CARD, TEST_PACK),
}

module.exports = {
    TestEvent
}
