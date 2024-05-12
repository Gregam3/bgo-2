import './App.css';
import cards from "./data/cards.json"
import PlayerCards from "./components/PlayerCards";
import EventPanel from "./components/EventPanel";
import {useState} from "react";
import {GameEventTypes} from "./classes/GameEventTypes";
import {GameEvent, INFINITE_EVENT_DURATION} from "./classes/GameEvent";

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

function randomCard() {
    const cardKeys = Object.keys(cards);
    const randomKey = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    let card = {...cards[randomKey]};
    card.id = uuidv4();
    return card;
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

function App() {
    const [eventQueue, setEventQueue] = useState([new GameEvent(0, GameEventTypes.OPEN_PACK, TEST_PACK)]);
    const [playerId, setPlayerId] = useState(0);
    const [gameState, setGameState] = useState({
        playerDeck: [],
        playerHand: [],
    });

    const updateGameStateProperty = (key, value) => {
        setGameState({...gameState, [key]: value});
    }

    const handleAddEvent = (event) => {
        setEventQueue([...eventQueue, event]);
    }

    const removePlayerCard = (cardToDelete) => {
        let newPlayerHand = gameState.playerHand.filter(card => card.id !== cardToDelete.id);
        updateGameStateProperty("playerHand", newPlayerHand);
    }

    const moveToNextEvent = () => {
        if (eventQueue.length > 0) {
            setEventQueue(eventQueue.slice(1));
        } else {
            setEventQueue([]);
        }
    }

    return (
        <div className="app-container">
            <div className={"background-container"}>
                <div className={"app-content"}>
                    <EventPanel currentEvent={eventQueue[0]} removePlayerCard={removePlayerCard}
                                moveToNextEvent={moveToNextEvent} gameState={gameState}/>
                    <PlayerCards
                        playerHand={[...gameState.playerHand]}
                        addEvent={handleAddEvent}
                        playerId={playerId}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
