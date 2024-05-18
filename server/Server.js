require('@babel/register')({
    extensions: ['.js', '.jsx'],
});

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const GameState = require('./GameState');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

// Enable CORS for all routes with more configuration
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Middleware to parse JSON requests
app.use(express.json());

const gameState = new GameState();

wss.on('connection', (ws) => {
    console.log('New player connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send(JSON.stringify({...gameState}));
});

app.options('*', cors()); // Enable preflight requests for all routes

app.post('/add-player', (req, res) => {
    let newId = gameState.addPlayer();
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(newId);
        }
    });
    res.status(200).json({playerId: newId});
});

app.post('/finish-event/:playerId', (req, res) => {
    console.log("Finishing event for player", req.params);
    const {playerId} = req.params;
    gameState.gameEventLoop.finishEvent(playerId, gameState);

    if (gameState.gameEventLoop.isEventFinished(gameState)) {
        console.log("Event finished, sending next event");
        const nextEvent = gameState.gameEventLoop.getNextEvent(gameState);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(nextEvent));
            }
        });
    }

    res.sendStatus(200);
});

const port = 3001;
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
