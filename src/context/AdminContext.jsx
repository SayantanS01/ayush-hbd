import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

const DEFAULT_CONTENT = {
  birthdayName: "Ayush",
  birthdayDate: "May 1",
  themeColor: "#3BA9F5",
  enableAnimations: true,
  musicUrl: "",
  heroSubtitle: "IT'S A BIRD! IT'S A PLANE!",
  heroTitle: "HAPPY BIRTHDAY",
  mainMessage: "Hope your day is as super as you are!",
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
  surprisePreText: "ARE YOU READY FOR A SURPRISE?",
  surpriseButtonText: "PRESS ME IF YOU DARE!",
  surpriseFinalTitle: "SURPRISE!",
  images: Array(20).fill(null).map((_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${i + 100}/800/800`,
    page: i < 10 ? 'gallery' : i < 15 ? 'home' : 'wishes'
  })),
};

export const AdminProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('is_admin') === 'true');
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
          setContent(data.content);
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

  // Save content
  const updateContent = async (newContent) => {
    const updated = { ...content, ...newContent };
    setContent(updated);
    
    if (supabase) {
      await supabase
        .from('birthday_content')
        .update({ content: updated })
        .eq('id', 1);
    } else {
      localStorage.setItem('ayush_hbd_content', JSON.stringify(updated));
    }
  };

  const login = (password) => {
    if (password === 'ayush2026') { // Demo password
      setIsAdmin(true);
      sessionStorage.setItem('is_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('is_admin');
  };

  return (
    <AdminContext.Provider value={{ content, updateContent, isAdmin, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};
