import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { Heart, Star } from 'lucide-react';

const Wishes = () => {
  const { content } = useAdmin();
  const [typedText, setTypedText] = useState('');
  const fullText = content.wishesLongText;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="pt-24 pb-32 px-6 min-h-screen bg-pink-50 relative overflow-hidden">
      {/* Floating Elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: Math.random() * 100 + "vw" }}
          animate={{ y: "-10vh" }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          className="absolute text-pink-300 opacity-30"
        >
          {i % 2 === 0 ? <Heart size={40} fill="currentColor" /> : <Star size={40} fill="currentColor" />}
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <motion.h1 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl text-cartoon-pink mb-4 hero-text"
          >
            {content.wishesTitle}
          </motion.h1>
        </header>

        <div className="card-cartoon bg-white p-12 relative">
          <div className="absolute -top-10 -right-10 text-8xl transform rotate-12">🍭</div>
          <div className="absolute -bottom-10 -left-10 text-8xl transform -rotate-12">🧸</div>
          
          <div className="min-h-[200px] flex items-center justify-center text-center">
            <p className="text-3xl sm:text-4xl font-body leading-relaxed text-gray-800">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.wishes.map((wish, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="card-cartoon bg-white text-center"
            >
              <div className="text-5xl mb-4">✨</div>
              <p className="font-comic text-xl text-gray-700">{wish}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishes;
