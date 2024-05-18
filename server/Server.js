require('@babel/register')({
    extensions: ['.js', '.jsx'],
});

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const TestEvents = require("./events/TestEvents");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected')
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });

    ws.send(JSON.stringify(TestEvents.TestEvent.TEST_DRAFT));
});



const port = 3001;
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
