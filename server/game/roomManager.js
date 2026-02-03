const { v4: uuidv4 } = require('uuid');

// Room management
class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  createRoom(roomName, creatorUsername) {
    const roomId = uuidv4();
    const room = {
      id: roomId,
      name: roomName,
      players: [creatorUsername],
      maxPlayers: 4,
      gameState: null,
      currentTurn: 0,
      cardsOnTable: [],
      status: 'waiting' // waiting, playing, finished
    };
    
    this.rooms.set(roomId, room);
    return room;
  }

  joinRoom(roomId, username) {
    const room = this.rooms.get(roomId);
    
    if (!room) {
      return { success: false, message: 'Room not found' };
    }
    
    if (room.players.length >= room.maxPlayers) {
      return { success: false, message: 'Room is full' };
    }
    
    if (room.players.includes(username)) {
      return { success: false, message: 'Already in room' };
    }
    
    room.players.push(username);
    return { success: true, room };
  }

  leaveRoom(roomId, username) {
    const room = this.rooms.get(roomId);
    
    if (!room) {
      return { success: false, message: 'Room not found' };
    }
    
    room.players = room.players.filter(p => p !== username);
    
    // Delete room if empty
    if (room.players.length === 0) {
      this.rooms.delete(roomId);
    }
    
    return { success: true };
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  getAllRooms() {
    return Array.from(this.rooms.values()).map(room => ({
      id: room.id,
      name: room.name,
      players: room.players.length,
      maxPlayers: room.maxPlayers,
      status: room.status
    }));
  }

  startGame(roomId, gameState) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.gameState = gameState;
      room.status = 'playing';
      return true;
    }
    return false;
  }

  playCard(roomId, playerIndex, cardIndex) {
    const room = this.rooms.get(roomId);
    if (!room || !room.gameState) {
      return { success: false, message: 'Invalid game state' };
    }

    const card = room.gameState.hands[playerIndex][cardIndex];
    if (!card) {
      return { success: false, message: 'Invalid card' };
    }

    // Remove card from player's hand
    room.gameState.hands[playerIndex].splice(cardIndex, 1);
    
    // Add card to table
    room.cardsOnTable.push({ playerIndex, card });
    
    // Move to next player
    room.currentTurn = (room.currentTurn + 1) % room.players.length;

    return { success: true, card, currentTurn: room.currentTurn };
  }
}

module.exports = new RoomManager();
