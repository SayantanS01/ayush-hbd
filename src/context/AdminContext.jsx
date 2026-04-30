import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

const DEFAULT_CONTENT = {
  birthdayName: "Ayush",
  birthdayDate: "May 1",
  themeColor: "#3BA9F5",
  enableAnimations: true,
  musicUrl: "",
  // Home Page
  heroSubtitle: "IT'S A BIRD! IT'S A PLANE!",
  heroTitle: "HAPPY BIRTHDAY",
  mainMessage: "Hope your day is as super as you are!",
  // Gallery Page
  galleryTitle: "SUPER GALLERY",
  gallerySubtitle: "Capturing every magical moment!",
  // Games Page
  gamesTitle: "FUN & GAMES!",
  gamesSubtitle: "Choose a mission, little hero!",
  // Wishes Page
  wishesTitle: "MAGICAL WISHES",
  wishesLongText: "Dear Ayush, you are our shining star! Every day with you is an adventure. We love you to the moon and back!",
  wishes: [
    "You're our little superhero!",
    "Grow big and strong like a friendly monster!",
    "May your day be filled with cake and joy!"
  ],
  // Surprise Page
  surprisePreText: "ARE YOU READY FOR A SURPRISE?",
  surpriseButtonText: "PRESS ME IF YOU DARE!",
  surpriseFinalTitle: "SURPRISE!",
  // Media
  images: Array(20).fill(null).map((_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${i + 100}/800/800`,
    page: i < 10 ? 'gallery' : i < 15 ? 'home' : 'wishes'
  })),
};

export const AdminProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('ayush_hbd_content');
    return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('is_admin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('ayush_hbd_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent) => {
    setContent(prev => ({ ...prev, ...newContent }));
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
    <AdminContext.Provider value={{ content, updateContent, isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
