const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('joinChannelChat', (clubId) => {
        console.log(`${socket.id} joined channel with id ${clubId}`);
        socket.join(clubId);
    });

    socket.on('chatMessage', ({clubId, chatInfo}) => {
        io.to(clubId).emit('message', chatInfo);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log('Server started');
});
