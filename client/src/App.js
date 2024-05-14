import './App.css';
import PlayerCards from "./components/PlayerCards";
import EventPanel from "./components/EventPanel";
import { useState, useEffect } from "react";
import { GameEvent } from './common/classes/GameEvent';
import GameStateUpdater from "./components/utility/GameStateUpdater";

function App() {
    const [eventQueue, setEventQueue] = useState([GameEvent.TEST_DRAFT, GameEvent.TEST_DRAW]);
    const [playerId, setPlayerId] = useState(0);
    const [gameState, setGameState] = useState({
        playerDeck: [],
        playerHand: [],
    });

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3000');

        ws.onmessage = (event) => {
            const receivedEvent = JSON.parse(event.data);
            setEventQueue(prevQueue => [...prevQueue, receivedEvent]);
        };

        return () => {
            ws.close();
        };
    }, []);

    const endCurrentEvent = () => {
        setEventQueue(eventQueue.slice(1));
    };

    const updateGameStateProperty = (key, value) => {
        setGameState({ ...gameState, [key]: value });
    };

    const handleAddEvent = (event) => {
        setEventQueue([...eventQueue, event]);
    };

    const removePlayerCard = (cardToDelete) => {
        updateGameStateProperty("playerHand", GameStateUpdater.removePlayerCardFromHand(gameState, cardToDelete));
    };

    const moveToNextEvent = () => {
        if (eventQueue.length > 0) {
            setEventQueue(eventQueue.slice(1));
        } else {
            setEventQueue([]);
        }
    };

    return (
        <div className="app-container">
            <div className="background-container">
                <div className="app-content">
                    <EventPanel
                        currentEvent={eventQueue[0]}
                        removePlayerCard={removePlayerCard}
                        moveToNextEvent={moveToNextEvent}
                        gameState={gameState}
                        setGameState={setGameState}
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
