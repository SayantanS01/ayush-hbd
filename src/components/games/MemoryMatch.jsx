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
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || solved.includes(idx);
          return (
            <div key={card.id} className="aspect-square perspective-1000">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full h-full cursor-pointer"
                onClick={() => handleFlip(idx)}
              >
                {/* Front Face */}
                <div 
                  className="absolute inset-0 backface-hidden card-cartoon bg-white flex items-center justify-center text-4xl shadow-cartoon border-[4px] border-black rounded-2xl"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', zIndex: isFlipped ? 1 : 2 }}
                >
                  ❓
                </div>
                
                {/* Back Face */}
                <div 
                  className="absolute inset-0 backface-hidden flex items-center justify-center text-5xl bg-cartoon-yellow shadow-cartoon border-[4px] border-black rounded-2xl"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    zIndex: isFlipped ? 2 : 1
                  }}
                >
                  {card.emoji}
                </div>
              </motion.div>
            </div>
          );
        })}
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
