import './App.css';
import PlayerCards from "./components/PlayerCards";
import EventPanel from "./components/EventPanel";
import {useState} from "react";
import {GameEventTypes} from "./classes/GameEventTypes";
import {GameEvent} from "./classes/GameEvent";
import GameStateUpdater from "./components/utility/GameStateUpdater";
import {TEST_PACK} from "./components/utility/DevUtils";

function App() {
    const [eventQueue, setEventQueue] = useState([GameEvent.TEST_DRAFT, GameEvent.TEST_DRAW]);
    const [playerId, setPlayerId] = useState(0);
    const [gameState, setGameState] = useState({
        playerDeck: [],
        playerHand: [],
    });

    const endCurrentEvent = () => {
        setEventQueue(eventQueue.slice(1));
    }

    const updateGameStateProperty = (key, value) => {
        setGameState({...gameState, [key]: value});
    }

    const handleAddEvent = (event) => {
        setEventQueue([...eventQueue, event]);
    }

    const removePlayerCard = (cardToDelete) => {
        updateGameStateProperty("playerHand", GameStateUpdater.removePlayerCardFromHand(gameState, cardToDelete));
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
                    <EventPanel currentEvent={eventQueue[0]}
                                removePlayerCard={removePlayerCard}
                                moveToNextEvent={moveToNextEvent}
                                gameState={gameState} setGameState={setGameState}
                                endCurrentEvent={endCurrentEvent}
                    />
                    <PlayerCards
                        playerHand={[...gameState.playerHand]}
                        playerDeck={[...gameState.playerDeck]}
                        addEvent={handleAddEvent}
                        playerId={playerId}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
