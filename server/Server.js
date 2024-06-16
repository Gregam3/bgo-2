require('@babel/register')({
    extensions: ['.js', '.jsx'],
});

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const GameState = require('./GameState');
const cors = require('cors');
const Lock = require('./events/Lock');
const DiceCards = require("./events/cards/DiceCards");
const GameStateUpdater = require("../client/src/components/utility/GameStateUpdater");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const ALL_CARDS_MAP = DiceCards.ALL_CARDS.reduce((map, card) => {
    map[card.cardId] = card;
    return map;
}, {});

// Enable CORS for all routes with more configuration
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Middleware to parse JSON requests
app.use(express.json());

let gameState = new GameState();

wss.on('connection', (ws) => {
    console.log('New player connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send(JSON.stringify({...gameState.data}));
});

app.options('*', cors()); // Enable preflight requests for all routes

app.post('/add-player', (req, res) => {
    const {playerUUID} = req.body;
    let playerId = gameState.addPlayer(playerUUID);
    res.status(200).json({playerId});
});

app.post('/reset-game-state', (req, res) => {
    gameState = new GameState();
    res.sendStatus(200);
});

function updateGameState(newGameStateData, oldGameStateData) {
    if (!newGameStateData) {
        return oldGameStateData;
    }

    gameState.data.gameEventLoop.data = {...newGameStateData.gameEventLoop.data};
    for (let key in newGameStateData) {
        if (key !== 'gameEventLoop') {
            oldGameStateData[key] = newGameStateData[key];
        }
    }

    return gameState.data;
}

app.post('/finish-event/:playerId', async (req, res) => {
    console.log("Finishing event for player", req.params);
    const {playerId} = req.params;
    gameState.data = updateGameState(req.body.gameState, gameState.data)
    gameState.data.gameEventLoop.finishEvent(playerId, gameState);

    let gameEventLoop = gameState.data.gameEventLoop;
    if (gameEventLoop.isEventFinished(gameState) || gameEventLoop.data.currentEvent.isSimultaneous === false) {
        console.log("Event finished, sending next event");
        gameState.data.gameEventLoop.moveToNextEvent(gameState);
    }

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(gameState.data));
        }
    });

    res.sendStatus(200);
});

app.post('/play-card', async (req, res) => {
    const {clientGameState, playedCard, playerId} = req.body;

    gameState.data = updateGameState(ALL_CARDS_MAP[playedCard.cardId].gameStateEffect(clientGameState, playerId), gameState.data);
    gameState.data = new GameStateUpdater().moveCardFromPlayerHandToDeck(gameState.data, playerId, playedCard);

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(gameState.data));
        }
    });

    res.sendStatus(200);
});

app.post('/update-game-state', (req, res) => {
    gameState.data = updateGameState(req.body.newGameState, gameState.data);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(gameState.data));
        }
    });
    res.sendStatus(200);
});


const port = 3001;
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

