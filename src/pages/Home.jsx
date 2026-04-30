import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Zap } from 'lucide-react';

const Home = () => {
  const { content } = useAdmin();

  return (
    <div className="relative min-h-screen pt-20 pb-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 text-cartoon-yellow animate-float opacity-20">
        <Star size={100} fill="currentColor" />
      </div>
      <div className="absolute bottom-40 right-10 text-cartoon-red animate-float delay-700 opacity-20">
        <Zap size={120} fill="currentColor" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-cartoon-blue/10 to-cartoon-purple/10 -z-10 rotate-12" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="absolute -top-6 -left-6 text-cartoon-yellow animate-bounce-slow">
              <Sparkles size={40} />
            </span>
            <h2 className="font-comic text-3xl sm:text-4xl text-cartoon-blue hero-text">
              {content.heroSubtitle}
            </h2>
            <h1 className="font-comic text-7xl sm:text-9xl text-cartoon-red hero-text leading-tight">
              {content.heroTitle}<br />
              <span className="text-cartoon-yellow block transform -rotate-2">{content.birthdayName}!</span>
            </h1>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl sm:text-2xl font-body max-w-2xl mb-12"
        >
          {content.mainMessage}
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/gallery">
            <motion.button
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              className="btn-cartoon bg-cartoon-blue text-white"
            >
              EXPLORE MEMORIES
            </motion.button>
          </Link>
          <Link to="/games">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="btn-cartoon bg-cartoon-yellow text-black"
            >
              PLAY GAMES!
            </motion.button>
          </Link>
        </div>

        {/* Hero Character Entrance */}
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ 
            type: "spring", 
            duration: 2, 
            bounce: 0.4,
            delay: 1
          }}
          className="mt-20 text-[150px] sm:text-[250px] filter drop-shadow-cartoon select-none"
        >
          🦸‍♂️
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
