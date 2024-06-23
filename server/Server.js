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
const _ = require("lodash");
const GameStateManager = require("./GameStateManager");

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
let gameStateManager = new GameStateManager(gameState, wss);

wss.on('connection', (ws) => {
    console.log('New player connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send(JSON.stringify({...gameState.data}));
});

function broadcastGameStateUpdate() {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(gameState.data));
        }
    });
}

app.options('*', cors()); // Enable preflight requests for all routes

app.post('/add-player', (req, res) => {
    const {playerUUID} = req.body;
    let playerId = gameState.addPlayer(playerUUID);
    res.status(200).json({playerId});
});

app.post('/reset-game-state', (req, res) => {
    gameState = new GameState();
    gameStateManager = new GameStateManager(gameState, wss);

    res.sendStatus(200);
});

app.post('/finish-event/:playerId', async (req, res) => {
    console.log("Finishing event for player", req.params);
    const {playerId} = req.params;
    gameState.data.gameEventLoop.finishEvent(playerId, gameState);

    let gameEventLoop = gameState.data.gameEventLoop;
    if (gameEventLoop.isEventFinished(gameState) || gameEventLoop.data.currentEvent.isSimultaneous === false) {
        gameState.data.gameEventLoop.moveToNextEvent(gameState);
    }

    broadcastGameStateUpdate();

    res.sendStatus(200);
});

app.post('/update-game-state', (req, res) => {
    gameStateManager.addUpdate(req.body.newGameState);

    res.sendStatus(200);
});

app.post('/play-card', (req, res) => {
    const {playedCard, playerId} = req.body;

    let cardObject = ALL_CARDS_MAP[playedCard.cardId];

    setTimeout(() => {
        gameStateManager.addUpdate(cardObject.invoke(gameState.data, playerId));
    }, cardObject.timeoutMs);

    res.sendStatus(200);
});

const port = 3001;
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

