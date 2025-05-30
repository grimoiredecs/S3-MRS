const express = require('express');
const http = require('http'); // Node.js built-in HTTP module
const { Server } = require('socket.io'); // Socket.IO server

const app = express();
const server = http.createServer(app); // Create an HTTP server using your Express app

const io = new Server(server, {
    cors: {
        origin: "*", // Adjust this to your frontend's URL in production
        methods: ["GET", "POST"]
    }
});

// Your regular Express routes and middleware go here
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Example: serve an HTML file
});

// Socket.IO event handling
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });

    // Example: If a room gets booked, notify clients
    socket.on('bookRoom', (data) => {
        // Call your RoomService.bookSeats here
        // If successful:
        // io.emit('roomUpdated', { roomId: data.roomId, newRemaining: updatedRoom.remaining });
    });
});


// Start the HTTP server (which Socket.IO is attached to)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Express and Socket.IO server running on port ${PORT}`);
});