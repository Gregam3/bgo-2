import './App.css';
import PlayerCards from "./components/PlayerCards";
import EventPanel from "./components/EventPanel";
import { useState, useEffect } from "react";
import GameStateUpdater from "./components/utility/GameStateUpdater";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [eventQueue, setEventQueue] = useState([]);
    const [playerId, setPlayerId] = useState(null);
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        let playerUUID = getCookie("playerUUID");
        if (!playerUUID) {
            playerUUID = uuidv4();
            setCookie("playerUUID", playerUUID, 365);
        }

        axios.post("http://localhost:3001/add-player", { playerUUID })
            .then(response => {
                setPlayerId(response.data.playerId);
            })
            .catch(error => {
                console.error("There was an error adding the player:", error);
            });
    }, []);

    useEffect(() => {
        if (playerId === null) return;

        const ws = new WebSocket('ws://localhost:3001');

        ws.onmessage = (event) => {
            const responseGameState = JSON.parse(event.data);
            console.log("Received event: ", responseGameState);
            setGameState(responseGameState);
            setEventQueue([responseGameState.gameEventLoop.data.currentEvent]);
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

    const playerFinishedEvent = (gameState) => {
        if (eventQueue.length > 1) {
            endCurrentEvent();
            return;
        }
        axios.post(`http://localhost:3001/finish-event/${playerId}`, {gameState})
            .then(response => {
                console.log("Player finished event");
            })
            .catch(error => {
                console.error("There was an error finishing the event:", error);
            });
    };

    if (!gameState) {
        return "";
    }

    return (
        <div className="app-container">
            <div className="background-container">
                <div className="app-content">
                    <EventPanel
                        currentEvent={eventQueue[0]}
                        playerId={playerId}
                        removePlayerCard={removePlayerCard}
                        playerFinishedEvent={playerFinishedEvent}
                        gameState={gameState}
                        setGameState={setGameState}
                    />
                    <PlayerCards
                        playerHand={gameState?.players?.find(player => player.id === playerId).hand || []}
                        playerDeck={gameState?.players?.find(player => player.id === playerId).deck || []}
                        addEvent={handleAddEvent}
                        playerId={playerId}
                    />
                </div>
            </div>
        </div>
    );
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export default App;
