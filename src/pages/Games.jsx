import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BalloonPop from '../components/games/BalloonPop';
import MemoryMatch from '../components/games/MemoryMatch';
import HeroJump from '../components/games/HeroJump';

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'balloon', name: 'Balloon Pop', icon: '🎈', component: BalloonPop, color: 'bg-cartoon-red' },
    { id: 'memory', name: 'Hero Match', icon: '🃏', component: MemoryMatch, color: 'bg-cartoon-blue' },
    { id: 'jump', name: 'Hero Jump', icon: '👟', component: HeroJump, color: 'bg-cartoon-yellow' },
  ];

  return (
    <div className="pt-24 pb-32 px-6 min-h-screen bg-cartoon-purple/5">
      <div className="max-w-6xl mx-auto">
        {!activeGame ? (
          <>
            <header className="text-center mb-16">
              <motion.h1 
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="text-6xl text-cartoon-purple mb-4 hero-text"
              >
                {content.gamesTitle}
              </motion.h1>
              <p className="text-xl font-body">{content.gamesSubtitle}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {games.map((game, idx) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                  className="card-cartoon cursor-pointer group"
                  onClick={() => setActiveGame(game.id)}
                >
                  <div className={`w-full aspect-square rounded-2xl ${game.color} flex items-center justify-center text-8xl mb-6 shadow-inner`}>
                    {game.icon}
                  </div>
                  <h3 className="text-3xl text-center mb-4">{game.name}</h3>
                  <button className="w-full btn-cartoon bg-black text-white text-sm">PLAY NOW</button>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="relative">
            <button 
              onClick={() => setActiveGame(null)}
              className="absolute -top-12 left-0 font-comic text-xl text-cartoon-red hover:underline"
            >
              ← BACK TO GAMES
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGame}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {activeGame === 'balloon' && <BalloonPop />}
                {activeGame === 'memory' && <MemoryMatch />}
                {activeGame === 'jump' && <HeroJump />}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
