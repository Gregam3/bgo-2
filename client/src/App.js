import './App.css';
import PlayerCards from "./components/PlayerCards";
import EventPanel from "./components/EventPanel";
import { useState, useEffect } from "react";
import { GameEvent } from './common/classes/GameEvent';
import GameStateUpdater from "./components/utility/GameStateUpdater";
import {GameEventTypesClient} from "./components/events/GameEventTypesClient";

function App() {
    const [eventQueue, setEventQueue] = useState([]);
    const [playerId, setPlayerId] = useState(0);
    const [gameState, setGameState] = useState({
        playerDeck: [],
        playerHand: [],
    });

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3001');

        ws.onmessage = (event) => {
            const receivedEvent = JSON.parse(event.data);
            console.log("Received event: ", receivedEvent);
            receivedEvent.eventType = GameEventTypesClient[receivedEvent.eventType];
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
