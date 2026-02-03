import React, { useState, useEffect } from 'react';
import '../styles/Lobby.css';

function Lobby({ username, socket, onJoinRoom }) {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    // Request room list
    socket.emit('rooms:get');

    // Listen for room updates
    socket.on('rooms:list', (roomList) => {
      setRooms(roomList);
    });

    socket.on('rooms:update', (roomList) => {
      setRooms(roomList);
    });

    socket.on('room:created', (room) => {
      onJoinRoom(room);
    });

    socket.on('room:joined', (room) => {
      onJoinRoom(room);
    });

    socket.on('room:error', (message) => {
      alert(message);
    });

    return () => {
      socket.off('rooms:list');
      socket.off('rooms:update');
      socket.off('room:created');
      socket.off('room:joined');
      socket.off('room:error');
    };
  }, [socket, onJoinRoom]);

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      socket.emit('room:create', { roomName, username });
      setRoomName('');
      setShowCreateForm(false);
    }
  };

  const handleJoinRoom = (roomId) => {
    socket.emit('room:join', { roomId, username });
  };

  return (
    <div className="lobby-container">
      <div className="lobby-header">
        <h2>Game Lobby</h2>
        <div className="user-info">ผู้เล่น: {username}</div>
      </div>

      <div className="lobby-content">
        <div className="create-room-section">
          {!showCreateForm ? (
            <button 
              onClick={() => setShowCreateForm(true)} 
              className="btn-primary"
            >
              สร้างห้องใหม่
            </button>
          ) : (
            <div className="create-room-form">
              <input
                type="text"
                placeholder="ชื่อห้อง"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <button onClick={handleCreateRoom} className="btn-success">สร้าง</button>
              <button onClick={() => setShowCreateForm(false)} className="btn-secondary">ยกเลิก</button>
            </div>
          )}
        </div>

        <div className="rooms-section">
          <h3>ห้องเกมที่มีอยู่</h3>
          {rooms.length === 0 ? (
            <p className="no-rooms">ไม่มีห้องเกม กรุณาสร้างห้องใหม่</p>
          ) : (
            <div className="rooms-list">
              {rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <div className="room-info">
                    <h4>{room.name}</h4>
                    <p>ผู้เล่น: {room.players}/{room.maxPlayers}</p>
                    <span className={`status-badge status-${room.status}`}>
                      {room.status === 'waiting' ? 'รอผู้เล่น' : 'กำลังเล่น'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleJoinRoom(room.id)}
                    disabled={room.players >= room.maxPlayers || room.status === 'playing'}
                    className="btn-primary"
                  >
                    {room.players >= room.maxPlayers ? 'เต็ม' : 'เข้าร่วม'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lobby;
