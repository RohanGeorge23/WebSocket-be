import express from 'express'
import { WebSocketServer,WebSocket } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });
let count:number=0

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  console.log('Connected To WS server')
  count++

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log("Received Message",data)
        client.send(data, { binary: isBinary }); 
      }
    });
  });

    console.log('users connected ',count)
  ws.send('Hello! Message From Server!!');
});