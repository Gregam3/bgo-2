import './App.css';
import cards from "./cards/cards.json"
import PlayerCards from "./components/PlayerCards";
import EventPanel from "./components/EventPanel";
import {useEffect, useState} from "react";

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
    const [eventQueue, setEventQueue] = useState([]);
    const [playerId, setPlayerId] = useState(0);
    const [playerHand, setPlayerHand] = useState(randomHand());

    const handleAddEvent = (event) => {
        setEventQueue([...eventQueue, event]);
    }

    useEffect(() => {
        console.log("Event Queue", eventQueue);
    }, [eventQueue])

    return (
        <div className="app-container">
            <div className={"background-container"}>
                <div className={"app-content"}>
                    <EventPanel currentEvent={eventQueue[0]}/>
                    <PlayerCards
                        playerHand={[...playerHand]}
                        addEvent={handleAddEvent}
                        playerId={playerId}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
