import './App.css';
import cards from "./cards/cards.json"
import PlayerHand from "./components/PlayerHand";

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

function App() {
    return (
        <div className="app-container">
            <div className={"background-container"}>
                <div className={"app-content"}>
                    <h1>BGO</h1>
                    <PlayerHand playerHand={[
                        ...randomCards(3),
                    ]}/>
                </div>
            </div>
        </div>
    );
}

export default App;
