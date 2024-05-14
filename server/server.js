require('@babel/register')({
    extensions: ['.js', '.jsx'],
});

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { GameEvent } = require('../client/src/common/classes/GameEvent');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send(JSON.stringify(GameEvent.TEST_DRAFT));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 3001;
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
