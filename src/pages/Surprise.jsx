import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAdmin } from '../context/AdminContext';

const Surprise = () => {
  const { content } = useAdmin();
  const [stage, setStage] = useState(0); // 0: Idle, 1: Monster, 2: Battle, 3: Celebration

  const startSurprise = () => {
    setStage(1);
    setTimeout(() => setStage(2), 2000);
    setTimeout(() => {
      setStage(3);
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 }
      });
    }, 4500);
  };

  return (
    <div className="pt-24 pb-32 px-6 min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="stage0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-6xl text-white mb-8 hero-text">{content.surprisePreText}</h2>
            <button 
              onClick={startSurprise}
              className="btn-cartoon bg-cartoon-red text-white text-3xl px-12 py-6 animate-pulse"
            >
              {content.surpriseButtonText}
            </button>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="stage1"
            initial={{ y: 500, scale: 0.5 }}
            animate={{ y: 0, scale: 1.5 }}
            exit={{ x: 1000 }}
            transition={{ type: "spring", damping: 10 }}
            className="text-[200px] filter drop-shadow-[0_0_50px_rgba(255,0,0,0.5)]"
          >
            🦖
            <motion.div 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="absolute inset-0 text-cartoon-red opacity-50 blur-xl"
            >
              🦖
            </motion.div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="stage2"
            className="relative w-full max-w-4xl h-[400px]"
          >
             <motion.div
              initial={{ x: -500 }}
              animate={{ x: 100 }}
              className="absolute left-0 top-0 text-[150px]"
            >
              🦸‍♂️
            </motion.div>
            <motion.div
              initial={{ x: 500 }}
              animate={{ x: -100 }}
              className="absolute right-0 top-0 text-[150px]"
            >
              🦖
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ times: [0, 0.5, 1], duration: 1, repeat: 3 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-cartoon-yellow font-comic hero-text"
            >
              POW!
            </motion.div>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="stage3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[250px] mb-8"
            >
              🎂
            </motion.div>
            <h1 className="text-8xl text-cartoon-yellow hero-text mb-4">{content.surpriseFinalTitle}</h1>
            <h2 className="text-5xl text-white font-comic">HAPPY BIRTHDAY {content.birthdayName}!</h2>
            <div className="mt-12 flex gap-4 justify-center">
               <div className="text-6xl animate-bounce">🎈</div>
               <div className="text-6xl animate-bounce delay-100">🎁</div>
               <div className="text-6xl animate-bounce delay-200">🎊</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {stage > 0 && stage < 3 && (
        <div className="fixed inset-0 bg-red-900/20 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

export default Surprise;
