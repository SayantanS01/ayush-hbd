import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const EMOJIS = ['🦸‍♂️', '🦖', '🎈', '🎂', '🎁', '⚡', '🌟', '🚀'];

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const deck = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(deck);
    setFlipped([]);
    setSolved([]);
  };

  const handleFlip = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        setDisabled(false);
        if (solved.length + 2 === cards.length) {
          confetti({ particleCount: 200, spread: 100 });
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="card-cartoon p-8 bg-cartoon-blue/10 min-h-[600px] flex flex-col items-center">
      <div className="mb-8 text-center">
        <h2 className="text-4xl mb-2">HERO MATCH</h2>
        <p className="font-comic">Find all pairs to win!</p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-md w-full perspective-1000">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square cursor-pointer relative preserve-3d transition-all duration-500 ${
              flipped.includes(idx) || solved.includes(idx) ? 'rotate-y-180' : ''
            }`}
            onClick={() => handleFlip(idx)}
          >
            {/* Front Face */}
            <div 
              className="absolute inset-0 backface-hidden card-cartoon flex items-center justify-center text-4xl bg-white shadow-cartoon"
              style={{ transform: 'translateZ(1px)' }}
            >
              ❓
            </div>
            
            {/* Back Face */}
            <div 
              className="absolute inset-0 backface-hidden card-cartoon flex items-center justify-center text-5xl bg-cartoon-yellow rotate-y-180 shadow-cartoon"
              style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
            >
              {card.emoji}
            </div>
          </motion.div>
        ))}
      </div>

      {solved.length === cards.length && cards.length > 0 && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-12 text-center"
        >
          <h3 className="text-5xl text-cartoon-green mb-6">SUPER JOB!</h3>
          <button onClick={initializeGame} className="btn-cartoon bg-cartoon-red text-white">PLAY AGAIN</button>
        </motion.div>
      )}
    </div>
  );
};

export default MemoryMatch;
