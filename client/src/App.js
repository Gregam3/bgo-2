import './App.css';
import PlayerCards from "./components/PlayerCards";
import EventPanel from "./components/EventPanel";
import { useState, useEffect } from "react";
import { GameEvent } from './common/classes/GameEvent';
import GameStateUpdater from "./components/utility/GameStateUpdater";
import {GameEventTypesClient, getClientGameEventType} from "./components/events/framework/GameEventTypesClient";
import axios from "axios";
import cards from "./common/data/cards.json";

function App() {
    const [eventQueue, setEventQueue] = useState([]);
    const [playerId, setPlayerId] = useState(null);
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        axios.post("http://localhost:3001/add-player")
            .then(response => {
                setPlayerId(response.data.playerId);
            })
            .catch(error => {
                console.error("There was an error adding the player:", error);
            });
    }, []);

    useEffect(() => {
        if (gameState === null) return;
        console.log("Setting current event to: ", gameState.gameEventLoop);
        setEventQueue([gameState.gameEventLoop.currentEventType]);
    }, [gameState]);

    useEffect(() => {
        if (playerId === null) return;

        const ws = new WebSocket('ws://localhost:3001');

        ws.onmessage = (event) => {
            const gameState = JSON.parse(event.data);
            console.log("Received event: ", gameState);
            setGameState(gameState);
        };

        return () => {
            ws.close();
        };
    }, [playerId]);

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

    const playerFinishedEvent = () => {
        axios.post(`http://localhost:3001/finish-event/${playerId}`)
            .then(() => {
                console.log("Player finished event");
            })
            .catch(error => {
                console.error("There was an error finishing the event:", error);
            });
    };

    if (!gameState) {
        return "";
    }

    console.log(gameState, playerId)

    return (
        <div className="app-container">
            <div className="background-container">
                <div className="app-content">
                    <EventPanel
                        currentEvent={eventQueue[0]}
                        removePlayerCard={removePlayerCard}
                        moveToNextEvent={playerFinishedEvent}
                        gameState={gameState}
                        setGameState={setGameState}
                        endCurrentEvent={endCurrentEvent}
                    />
                    <PlayerCards
                        playerHand={[]}
                        playerDeck={[]}
                        addEvent={handleAddEvent}
                        playerId={playerId}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
