const socket = io();
let currentRoom = '';
let username = '';
const sound = document.getElementById('msgSound');

function joinRoom() {
  username = document.getElementById('username').value.trim();
  currentRoom = document.getElementById('room').value.trim();
  if (username && currentRoom) {
    document.getElementById('join-screen').classList.add('hidden');
    document.getElementById('chat-screen').classList.remove('hidden');
    document.getElementById('room-name').innerText = `Room: ${currentRoom}`;
    socket.emit('joinRoom', currentRoom);
  }
}

function sendMessage() {
  const msg = document.getElementById('message-input').value.trim();
  if (msg) {
    socket.emit('chatMessage', { room: currentRoom, user: username, message: msg });
    document.getElementById('message-input').value = '';
  }
}

socket.on('chatMessage', ({ user, message }) => {
  const chatBox = document.getElementById('chat-box');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.innerHTML = `<strong>${user}:</strong> ${message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  sound.play();
});
