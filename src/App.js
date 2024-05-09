import './App.css';
import cards from "./cards/cards.json"
import PlayerCards from "./components/PlayerCards";

function randomCard() {
    const cardKeys = Object.keys(cards);
    const randomKey = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    return cards[randomKey];
}

function randomCards(numberOfCards) {
    const randomCards = [];
    for (let i = 0; i < numberOfCards; i++) {
        randomCards.push(randomCard());
    }
    return randomCards;
}

function randomHand() {
    const randomCardNumber = Math.floor(Math.random() * 7) + 1;
    return randomCards(randomCardNumber);
}

function App() {
    return (
        <div className="app-container">
            <div className={"background-container"}>
                <div className={"app-content"}>
                    <h1>BGO</h1>
                    <PlayerCards playerHand={[
                        ...randomHand(),
                    ]}/>
                </div>
            </div>
        </div>
    );
}

export default App;
