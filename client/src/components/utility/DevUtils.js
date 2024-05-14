import cards from "../../common/data/cards.json";

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

export function randomCard() {
    const cardKeys = Object.keys(cards);
    const randomKey = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    let card = {...cards[randomKey]};
    card.id = uuidv4();
    return card;
}

export function randomCards(numberOfCards) {
    const randomCards = [];
    for (let i = 0; i < numberOfCards; i++) {
        randomCards.push(randomCard());
    }
    return randomCards;
}

export function randomHand() {
    const randomCardNumber = Math.floor(Math.random() * 7) + 1;
    return randomCards(randomCardNumber);
}

export const TEST_PACK = {
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