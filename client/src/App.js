import './App.css';
import PlayerCards from "./components/PlayerCards";
import EventPanel from "./components/EventPanel";
import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import {Board} from "./components/Board";
import GameStateUpdater from './components/utility/GameStateUpdater';

export const gameStateUpdater = GameStateUpdater.poster;

function App() {
    const [eventQueue, setEventQueue] = useState([]);
    const [playerId, setPlayerId] = useState(null);
    const [gameState, setGameState] = useState(null);
    const [gameStateUpdates, setGameStateUpdates] = useState([]);

    useEffect(() => {
        let playerUUID = getCookie("playerUUID");
        if (!playerUUID) {
            playerUUID = uuidv4();
            setCookie("playerUUID", playerUUID, 365);
        }

        axios.post("http://localhost:3001/add-player", {playerUUID})
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
            setGameState(responseGameState);
            setEventQueue([responseGameState.gameEventLoop.data.currentEvent]);
            setGameStateUpdates(prevState => [...prevState, {time: new Date(), gameState: responseGameState}]);
        };

        return () => {
            ws.close();
        };
    }, [playerId]);

    const endCurrentEvent = () => {
        setEventQueue(eventQueue.slice(1));
    };

    const handleAddEvent = (event) => {
        setEventQueue([...eventQueue, event]);
    };

    const playerFinishedEvent = (gameState) => {
        if (eventQueue.length > 1) {
            endCurrentEvent();
            return;
        }
        axios.post(`http://localhost:3001/finish-event/${playerId}`, {gameState})
            .then(response => {
            })
            .catch(error => {
                console.error("There was an error finishing the event:", error);
            });
    };

    const resetGameState = () => {
        axios.post("http://localhost:3001/reset-game-state")
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error("There was an error resetting the game state:", error);
            });
    }

    if (!gameState) {
        return "";
    }

    return (
        <div className="app-container">
            <div className="background-container">
                <div className="app-content">
                    <button style={{width: 200}} onClick={resetGameState}>Reset game state</button>
                    <Board tileCount={30} gameState={gameState}/>
                    <EventPanel
                        currentEvent={eventQueue[0]}
                        playerId={playerId}
                        playerFinishedEvent={playerFinishedEvent}
                        gameState={gameState}
                    />
                    <PlayerCards
                        gameState={gameState}
                        playerFinishedEvent={playerFinishedEvent}
                        playerHand={gameState?.players?.find(player => player.id === playerId).hand || []}
                        playerDeck={gameState?.players?.find(player => player.id === playerId).deck || []}
                        addEvent={handleAddEvent}
                        playerId={playerId}
                    />
                </div>
            </div>
            <div className={"event-log"}>
                {gameStateUpdates.map((update, index) => {
                    return <div key={index}>
                        <h3>{update.time.toLocaleTimeString()}</h3>
                    </div>
                })}
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
