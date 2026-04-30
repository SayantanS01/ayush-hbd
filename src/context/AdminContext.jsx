import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

const DEFAULT_CONTENT = {
  birthdayName: "Ayush",
  birthdayDate: "May 1",
  themeColor: "#3BA9F5",
  enableAnimations: true,
  musicUrl: "/bg-music.mp3",
  heroSubtitle: "WAIT... IS THAT A HERO IN THE SKY?! 🕷️ ⚡️",
  heroTitle: "HAPPY BIRTHDAY SUPERSTAR AYUSH! 🎉 🦸‍♂️",
  mainMessage: "Today is not just your birthday... It's your SUPER DAY! 💥 Get ready for fun, games, surprises, and an epic adventure made just for you! 🎁 🕷️ 🦖",
  galleryTitle: "SUPER GALLERY",
  gallerySubtitle: "Capturing every magical moment!",
  gamesTitle: "FUN & GAMES!",
  gamesSubtitle: "Choose a mission, little hero!",
  wishesTitle: "MAGICAL WISHES",
  wishesLongText: "Dear Ayush, you are our shining star! Every day with you is an adventure. We love you to the moon and back!",
  wishes: [
    "You're our little superhero!",
    "Grow big and strong like a friendly monster!",
    "May your day be filled with cake and joy!"
  ],
  surprisePreText: "HEY AYUSH... ARE YOU READY FOR AN EPIC SURPRISE? 🌌",
  surpriseButtonText: "CLICK ME... IF YOU'RE BRAVE ENOUGH! 😈 🔥",
  surpriseFinalTitle: "BOOOOM!!! 🎉 🦖 SUPER SURPRISE UNLOCKED!",
  images: Array(43).fill(null).map((_, i) => ({
    id: i,
    url: `/memory_${i + 1}.jpeg`,
  })),
};

export const AdminProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  // Load content
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (supabase) {
        const { data, error } = await supabase
          .from('birthday_content')
          .select('content')
          .eq('id', 1)
          .single();
        
        if (data) {
          let updatedContent = data.content;
          // Migration: if musicUrl is the old long name, update it to the new one
          if (updatedContent.musicUrl && updatedContent.musicUrl.includes('Sunflower')) {
            updatedContent.musicUrl = '/bg-music.mp3';
          }
          setContent(updatedContent);
        } else if (error && error.code === 'PGRST116') {
          // Row doesn't exist, create it with defaults
          await supabase.from('birthday_content').insert([{ id: 1, content: DEFAULT_CONTENT }]);
        }
      } else {
        const saved = localStorage.getItem('ayush_hbd_content');
        if (saved) setContent(JSON.parse(saved));
      }
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <AdminContext.Provider value={{ content, loading }}>
      {children}
    </AdminContext.Provider>
  );
};
