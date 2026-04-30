import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const MusicPlayer = () => {
  const { content } = useAdmin();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (content.musicUrl && audioRef.current) {
      audioRef.current.src = content.musicUrl;
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.load();
    }
  }, [content.musicUrl]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <audio ref={audioRef} loop />
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-14 h-14 rounded-full border-[3px] border-black shadow-cartoon flex items-center justify-center transition-colors ${
          isPlaying ? 'bg-cartoon-green' : 'bg-cartoon-red'
        }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Volume2 className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <VolumeX className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 right-0 bg-white px-3 py-1 rounded-full border-2 border-black text-[10px] font-comic whitespace-nowrap"
        >
          <Music className="w-3 h-3 inline mr-1 animate-spin" />
          Playing Magic...
        </motion.div>
      )}
    </div>
  );
};

export default MusicPlayer;
