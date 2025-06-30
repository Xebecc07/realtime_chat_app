const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('joinRoom', room => {
    socket.join(room);
    socket.room = room;
    io.to(room).emit('chatMessage', { user: 'System', message: '🔔 A user joined the room.' });
  });

  socket.on('chatMessage', ({ room, user, message }) => {
    io.to(room).emit('chatMessage', { user, message });
  });

  socket.on('disconnect', () => {
    if (socket.room) {
      io.to(socket.room).emit('chatMessage', { user: 'System', message: '⚠️ A user left the room.' });
    }
  });
});

http.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
