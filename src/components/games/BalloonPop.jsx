import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const BalloonPop = () => {
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      const spawn = setInterval(() => {
        const id = Math.random();
        setBalloons(prev => [...prev, {
          id,
          x: Math.random() * 80 + 10,
          color: ['#EF4444', '#3BA9F5', '#F5D300', '#22C55E', '#A855F7'][Math.floor(Math.random() * 5)]
        }]);
      }, 800);
      return () => { clearInterval(timer); clearInterval(spawn); };
    } else if (timeLeft === 0) {
      setIsGameOver(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [timeLeft, isGameOver]);

  const popBalloon = (id) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    setScore(prev => prev + 1);
  };

  return (
    <div className="card-cartoon h-[600px] relative overflow-hidden bg-sky-100 flex flex-col items-center">
      <div className="absolute top-4 left-4 font-comic text-2xl z-10">SCORE: {score}</div>
      <div className="absolute top-4 right-4 font-comic text-2xl z-10">TIME: {timeLeft}s</div>

      {isGameOver ? (
        <div className="flex flex-col items-center justify-center h-full z-10 text-center">
          <h2 className="text-6xl text-cartoon-red mb-4">GAME OVER!</h2>
          <p className="text-3xl mb-8">You popped {score} balloons!</p>
          <button 
            onClick={() => { setScore(0); setTimeLeft(30); setIsGameOver(false); setBalloons([]); }}
            className="btn-cartoon bg-cartoon-green text-white"
          >
            PLAY AGAIN
          </button>
        </div>
      ) : (
        <AnimatePresence>
          {balloons.map(balloon => (
            <motion.div
              key={balloon.id}
              initial={{ y: 700 }}
              animate={{ y: -100 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              className="absolute cursor-pointer text-6xl"
              style={{ left: `${balloon.x}%` }}
              onPointerDown={() => popBalloon(balloon.id)}
            >
              <div 
                className="w-16 h-20 rounded-[50%] relative"
                style={{ backgroundColor: balloon.color, boxShadow: 'inset -10px -10px 0 rgba(0,0,0,0.1)' }}
              >
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-10 bg-black/20" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default BalloonPop;
