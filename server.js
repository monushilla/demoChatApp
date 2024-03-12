const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3009;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle messages
    socket.on('chat message', (message) => {
        console.log('Message:', message);
        // Broadcast message to all connected clients except the sender
        socket.broadcast.emit('chat message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
