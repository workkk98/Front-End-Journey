const express = require('express');
const SocketServer = require('ws').Server;

const server = express().listen(3000, () => console.log('listen on 3000'));

// 将express实例交给SocketServer开启WebSocket的服务
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {

  console.log('clien connected');

  ws.on('message', (data) => {
    console.log(data);
    ws.send(`I have recevied your message: ${data}`);

    createTimer(ws);
  })

  ws.on('close', () => {
    console.log('close connected');
  })
});

function createTimer (ws) {
  var timer = setTimeout(() => {
    ws.send('It\'s my turn to message you')
  }, 1000)
}



