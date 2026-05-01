import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroJump = () => {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, OVER
  const [score, setScore] = useState(0);
  const [displayY, setDisplayY] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  
  const physicsRef = useRef({
    posY: 0,
    velocity: 0,
    score: 0
  });

  const GRAVITY = 0.8;
  const JUMP_STRENGTH = -18;
  const GROUND_LEVEL = 0;

  const startGame = () => {
    setGameState('PLAYING');
    setScore(0);
    setObstacles([]);
    physicsRef.current = { posY: 0, velocity: 0, score: 0 };
    setDisplayY(0);
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const gameLoop = setInterval(() => {
      const p = physicsRef.current;
      
      // Update Physics
      p.velocity += GRAVITY;
      p.posY += p.velocity;
      
      if (p.posY >= GROUND_LEVEL) {
        p.posY = GROUND_LEVEL;
        p.velocity = 0;
      }

      p.score += 1;
      setScore(Math.floor(p.score / 5)); // Slow down score display
      setDisplayY(p.posY);
      
      // Spawn obstacles
      if (Math.random() < 0.03) {
        setObstacles(obs => {
          // Prevent too many obstacles
          if (obs.length > 0 && obs[obs.length - 1].x > 70) return obs;
          return [...obs, { id: Date.now(), x: 100 }];
        });
      }

      // Move obstacles and Collision Detection
      setObstacles(obs => {
        const nextObs = obs.map(o => ({ ...o, x: o.x - 2 })).filter(o => o.x > -10);
        
        // Collision detection: hero is at x=10%
        nextObs.forEach(o => {
          if (o.x > 8 && o.x < 18 && p.posY > -40) {
            setGameState('OVER');
          }
        });
        
        return nextObs;
      });
    }, 20);

    return () => clearInterval(gameLoop);
  }, [gameState]);

  const handleJump = () => {
    if (gameState === 'START' || gameState === 'OVER') {
      startGame();
      return;
    }
    if (gameState === 'PLAYING' && physicsRef.current.posY === GROUND_LEVEL) {
      physicsRef.current.velocity = JUMP_STRENGTH;
    }
  };

  return (
    <div 
      className="card-cartoon h-[400px] relative overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 cursor-pointer select-none"
      onPointerDown={handleJump}
    >
      <div className="absolute top-4 left-4 font-comic text-2xl z-10">SCORE: {score}</div>
      
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-10 bg-cartoon-green border-t-[3px] border-black" />

      {/* Hero */}
      <motion.div
        animate={{ y: displayY }}
        transition={{ type: "tween", ease: "linear", duration: 0.02 }}
        className="absolute bottom-10 left-[10%] text-6xl z-20"
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

      <AnimatePresence>
        {gameState === 'START' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6 text-center z-30"
          >
            <h2 className="text-5xl mb-4 text-white">HERO JUMP</h2>
            <p className="text-xl mb-6 font-comic">Tap to jump over the monsters!</p>
            <div className="animate-bounce text-6xl">👆</div>
          </motion.div>
        )}

        {gameState === 'OVER' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-cartoon-red/90 flex flex-col items-center justify-center text-white p-6 text-center z-30"
          >
            <h2 className="text-6xl mb-2 text-white">WHAM!</h2>
            <p className="text-2xl mb-6 font-comic">Final Score: {score}</p>
            <button className="btn-cartoon bg-white text-black hover:scale-110 transition-transform">TRY AGAIN</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroJump;
