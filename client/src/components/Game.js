import React, { useState, useEffect } from 'react';
import '../styles/Game.css';

function Game({ username, socket, room }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(-1);
  const [hand, setHand] = useState([]);
  const [players, setPlayers] = useState(room.players);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [cardsOnTable, setCardsOnTable] = useState([]);

  useEffect(() => {
    socket.on('room:player-joined', (data) => {
      setPlayers(data.room.players);
    });

    socket.on('room:player-left', (data) => {
      setPlayers((prev) => prev.filter((p) => p !== data.username));
    });

    socket.on('game:started', (data) => {
      setGameStarted(true);
      setPlayerIndex(data.playerIndex);
      setHand(data.hand);
      setPlayers(data.players);
      setCurrentTurn(data.currentTurn);
    });

    socket.on('game:card-played', (data) => {
      setCardsOnTable((prev) => [...prev, { playerIndex: data.playerIndex, card: data.card }]);
      setCurrentTurn(data.currentTurn);
    });

    socket.on('game:error', (message) => {
      alert(message);
    });

    return () => {
      socket.off('room:player-joined');
      socket.off('room:player-left');
      socket.off('game:started');
      socket.off('game:card-played');
      socket.off('game:error');
    };
  }, [socket]);

  const handleStartGame = () => {
    socket.emit('game:start', { roomId: room.id });
  };

  const handlePlayCard = (cardIndex) => {
    if (currentTurn === playerIndex) {
      socket.emit('game:play-card', {
        roomId: room.id,
        playerIndex,
        cardIndex
      });
      
      // Remove card from hand optimistically
      setHand((prev) => prev.filter((_, i) => i !== cardIndex));
    }
  };

  const handleLeaveRoom = () => {
    socket.emit('room:leave', { roomId: room.id, username });
    window.location.reload();
  };

  const getCardSymbol = (suit) => {
    const symbols = {
      hearts: '♥',
      diamonds: '♦',
      clubs: '♣',
      spades: '♠'
    };
    return symbols[suit] || suit;
  };

  const getCardColor = (suit) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';
  };

  if (!gameStarted) {
    return (
      <div className="game-container">
        <div className="game-header">
          <h2>ห้อง: {room.name}</h2>
          <button onClick={handleLeaveRoom} className="btn-danger">ออกจากห้อง</button>
        </div>
        
        <div className="waiting-room">
          <h3>รอผู้เล่น...</h3>
          <div className="players-waiting">
            {players.map((player, index) => (
              <div key={index} className="player-badge">
                {player}
              </div>
            ))}
          </div>
          <p>ผู้เล่น: {players.length}/4</p>
          {players.length >= 2 && players[0] === username && (
            <button onClick={handleStartGame} className="btn-success btn-large">
              เริ่มเกม
            </button>
          )}
          {players.length < 2 && (
            <p className="hint">ต้องมีผู้เล่นอย่างน้อย 2 คนเพื่อเริ่มเกม</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>ห้อง: {room.name}</h2>
        <div className="game-info">
          <span>ตาของ: {players[currentTurn]}</span>
          {currentTurn === playerIndex && <span className="your-turn">ตาคุณ!</span>}
        </div>
        <button onClick={handleLeaveRoom} className="btn-danger">ออกจากห้อง</button>
      </div>

      <div className="game-board">
        <div className="players-info">
          {players.map((player, index) => (
            <div 
              key={index} 
              className={`player-info ${index === currentTurn ? 'active-player' : ''} ${index === playerIndex ? 'current-player' : ''}`}
            >
              <span className="player-name">{player}</span>
              {index === playerIndex && <span className="badge-you">(คุณ)</span>}
              {index === currentTurn && <span className="turn-indicator">►</span>}
            </div>
          ))}
        </div>

        <div className="table-area">
          <h3>ไพ่บนโต๊ะ</h3>
          <div className="cards-on-table">
            {cardsOnTable.length === 0 ? (
              <p className="no-cards">ยังไม่มีไพ่บนโต๊ะ</p>
            ) : (
              cardsOnTable.map((item, index) => (
                <div key={index} className="played-card">
                  <span className="player-label">{players[item.playerIndex]}</span>
                  <div className={`card color-${getCardColor(item.card.suit)}`}>
                    <div className="card-rank">{item.card.rank}</div>
                    <div className="card-suit">{getCardSymbol(item.card.suit)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="player-hand">
          <h3>ไพ่ของคุณ ({hand.length} ใบ)</h3>
          <div className="hand-cards">
            {hand.map((card, index) => (
              <div
                key={card.id}
                className={`card color-${getCardColor(card.suit)} ${currentTurn === playerIndex ? 'playable' : 'disabled'}`}
                onClick={() => handlePlayCard(index)}
              >
                <div className="card-rank">{card.rank}</div>
                <div className="card-suit">{getCardSymbol(card.suit)}</div>
              </div>
            ))}
          </div>
          {currentTurn !== playerIndex && (
            <p className="hint">รอตาผู้เล่นคนอื่น...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
