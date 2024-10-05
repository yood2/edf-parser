import { EdfParser } from '../src/edf-parser';

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    const path = './demo/data/test.edf';
    const parser = new EdfParser();
    parser.parse(path).then((result) => {
        ws.send(JSON.stringify(result, null, 2));
    });
    console.log('Sent');
});

wss.on('close', () => {
    console.log('Client disconnected');
});

console.log('WebSocket server is running on ws://localhost:8080');
