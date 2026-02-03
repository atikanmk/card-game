// Card game logic
class CardGame {
  constructor() {
    this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  }

  createDeck() {
    const deck = [];
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        deck.push({ suit, rank, id: `${rank}_${suit}` });
      }
    }
    return deck;
  }

  shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  dealCards(deck, numPlayers) {
    const hands = Array.from({ length: numPlayers }, () => []);
    let currentPlayer = 0;
    
    for (const card of deck) {
      hands[currentPlayer].push(card);
      currentPlayer = (currentPlayer + 1) % numPlayers;
    }
    
    return hands;
  }
}

module.exports = CardGame;
