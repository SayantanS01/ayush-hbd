import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroJump = () => {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, OVER
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const gameRef = useRef(null);
  const heroRef = useRef(null);

  const startGame = () => {
    setGameState('PLAYING');
    setScore(0);
    setObstacles([]);
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const gameLoop = setInterval(() => {
      setScore(s => s + 1);
      
      // Spawn obstacles
      if (Math.random() < 0.02) {
        setObstacles(obs => [...obs, { id: Date.now(), x: 100 }]);
      }

      // Move obstacles
      setObstacles(obs => {
        const nextObs = obs.map(o => ({ ...o, x: o.x - 2 })).filter(o => o.x > -10);
        
        // Collision detection
        nextObs.forEach(o => {
          if (o.x > 10 && o.x < 25 && !isJumping) {
            setGameState('OVER');
          }
        });
        
        return nextObs;
      });
    }, 20);

    return () => clearInterval(gameLoop);
  }, [gameState, isJumping]);

  const handleJump = () => {
    if (gameState === 'START') startGame();
    if (gameState === 'OVER') startGame();
    if (gameState === 'PLAYING' && !isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
    }
  };

  return (
    <div 
      className="card-cartoon h-[400px] relative overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 cursor-pointer select-none"
      onClick={handleJump}
    >
      <div className="absolute top-4 left-4 font-comic text-2xl z-10">SCORE: {score}</div>
      
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-10 bg-cartoon-green border-t-[3px] border-black" />

      {/* Hero */}
      <motion.div
        animate={{ y: isJumping ? -150 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-10 left-[10%] text-6xl"
      >
        🦸‍♂️
      </motion.div>

      {/* Obstacles */}
      {obstacles.map(obs => (
        <div 
          key={obs.id}
          className="absolute bottom-10 text-5xl transition-all duration-20"
          style={{ left: `${obs.x}%` }}
        >
          🦖
        </div>
      ))}

      {gameState === 'START' && (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6 text-center">
          <h2 className="text-5xl mb-4">HERO JUMP</h2>
          <p className="text-xl mb-6">Click to jump over the monsters!</p>
          <div className="animate-bounce text-6xl">👆</div>
        </div>
      )}

      {gameState === 'OVER' && (
        <div className="absolute inset-0 bg-cartoon-red/90 flex flex-col items-center justify-center text-white p-6 text-center">
          <h2 className="text-6xl mb-2">WHAM!</h2>
          <p className="text-2xl mb-6">Final Score: {score}</p>
          <button className="btn-cartoon bg-white text-black">TRY AGAIN</button>
        </div>
      )}
    </div>
  );
};

export default HeroJump;
