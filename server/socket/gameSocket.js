const CardGame = require('../game/cardGame');
const roomManager = require('../game/roomManager');

function setupSocketHandlers(io) {
  const cardGame = new CardGame();
  const userSockets = new Map(); // username -> socketId

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // User authentication
    socket.on('user:authenticate', (username) => {
      socket.username = username;
      userSockets.set(username, socket.id);
      socket.emit('user:authenticated', { username });
    });

    // Get all rooms
    socket.on('rooms:get', () => {
      const rooms = roomManager.getAllRooms();
      socket.emit('rooms:list', rooms);
    });

    // Create a new room
    socket.on('room:create', (data) => {
      const { roomName, username } = data;
      const room = roomManager.createRoom(roomName, username);
      socket.join(room.id);
      socket.currentRoom = room.id;
      
      socket.emit('room:created', room);
      io.emit('rooms:update', roomManager.getAllRooms());
    });

    // Join a room
    socket.on('room:join', (data) => {
      const { roomId, username } = data;
      const result = roomManager.joinRoom(roomId, username);
      
      if (result.success) {
        socket.join(roomId);
        socket.currentRoom = roomId;
        socket.emit('room:joined', result.room);
        io.to(roomId).emit('room:player-joined', {
          room: result.room,
          username
        });
        io.emit('rooms:update', roomManager.getAllRooms());
      } else {
        socket.emit('room:error', result.message);
      }
    });

    // Leave a room
    socket.on('room:leave', (data) => {
      const { roomId, username } = data;
      roomManager.leaveRoom(roomId, username);
      socket.leave(roomId);
      socket.currentRoom = null;
      
      io.to(roomId).emit('room:player-left', { username });
      io.emit('rooms:update', roomManager.getAllRooms());
    });

    // Start game
    socket.on('game:start', (data) => {
      const { roomId } = data;
      const room = roomManager.getRoom(roomId);
      
      if (!room) {
        socket.emit('game:error', 'Room not found');
        return;
      }

      if (room.players.length < 2) {
        socket.emit('game:error', 'Need at least 2 players to start');
        return;
      }

      // Create and shuffle deck
      const deck = cardGame.createDeck();
      const shuffledDeck = cardGame.shuffleDeck(deck);
      
      // Deal cards
      const hands = cardGame.dealCards(shuffledDeck, room.players.length);
      
      const gameState = {
        hands,
        players: room.players
      };

      roomManager.startGame(roomId, gameState);
      
      // Send game state to each player
      room.players.forEach((player, index) => {
        const socketId = userSockets.get(player);
        if (socketId) {
          io.to(socketId).emit('game:started', {
            playerIndex: index,
            hand: hands[index],
            players: room.players,
            currentTurn: 0
          });
        }
      });

      io.emit('rooms:update', roomManager.getAllRooms());
    });

    // Play a card
    socket.on('game:play-card', (data) => {
      const { roomId, playerIndex, cardIndex } = data;
      const result = roomManager.playCard(roomId, playerIndex, cardIndex);
      
      if (result.success) {
        io.to(roomId).emit('game:card-played', {
          playerIndex,
          card: result.card,
          currentTurn: result.currentTurn
        });
      } else {
        socket.emit('game:error', result.message);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      
      if (socket.username) {
        userSockets.delete(socket.username);
      }
      
      if (socket.currentRoom && socket.username) {
        roomManager.leaveRoom(socket.currentRoom, socket.username);
        io.to(socket.currentRoom).emit('room:player-left', {
          username: socket.username
        });
        io.emit('rooms:update', roomManager.getAllRooms());
      }
    });
  });
}

module.exports = setupSocketHandlers;
