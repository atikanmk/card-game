import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Login from './components/Login';
import Register from './components/Register';
import Lobby from './components/Lobby';
import Game from './components/Game';
import './styles/App.css';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';

function App() {
  const [view, setView] = useState('login'); // login, register, lobby, game
  const [username, setUsername] = useState('');
  const [socket, setSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    // Initialize socket connection when user logs in
    if (username && !socket) {
      const newSocket = io(SOCKET_URL);
      
      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('user:authenticate', username);
      });

      newSocket.on('user:authenticated', (data) => {
        console.log('Authenticated:', data.username);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [username, socket]);

  const handleLogin = (user) => {
    setUsername(user);
    setView('lobby');
  };

  const handleRegister = (user) => {
    setUsername(user);
    setView('lobby');
  };

  const handleJoinRoom = (room) => {
    setCurrentRoom(room);
    setView('game');
  };

  const switchToRegister = () => setView('register');
  const switchToLogin = () => setView('login');

  return (
    <div className="App">
      {view === 'login' && (
        <Login onLogin={handleLogin} switchToRegister={switchToRegister} />
      )}
      {view === 'register' && (
        <Register onRegister={handleRegister} switchToLogin={switchToLogin} />
      )}
      {view === 'lobby' && socket && (
        <Lobby username={username} socket={socket} onJoinRoom={handleJoinRoom} />
      )}
      {view === 'game' && socket && currentRoom && (
        <Game username={username} socket={socket} room={currentRoom} />
      )}
    </div>
  );
}

export default App;
