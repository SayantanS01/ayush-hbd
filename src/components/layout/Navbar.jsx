import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Image, Gamepad2, Heart, Gift } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NavLink = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={cn(
      "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 group",
      active ? "bg-cartoon-yellow text-black scale-110 -rotate-3 shadow-cartoon" : "text-gray-600 hover:text-cartoon-blue hover:scale-105"
    )}
  >
    <Icon className={cn("w-6 h-6 transition-transform", active && "animate-bounce")} />
    <span className="font-comic text-xs uppercase tracking-tight">{label}</span>
  </Link>
);

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/90 backdrop-blur-md border-[3px] border-black rounded-3xl shadow-cartoon-lg flex items-center gap-4 sm:gap-8 max-w-[95vw] overflow-x-auto no-scrollbar">
      <NavLink to="/" icon={Home} label="Home" active={location.pathname === '/'} />
      <NavLink to="/gallery" icon={Image} label="Gallery" active={location.pathname === '/gallery'} />
      <NavLink to="/games" icon={Gamepad2} label="Games" active={location.pathname === '/games'} />
      <NavLink to="/wishes" icon={Heart} label="Wishes" active={location.pathname === '/wishes'} />
      <NavLink to="/surprise" icon={Gift} label="Surprise" active={location.pathname === '/surprise'} />
    </nav>
  );
};

export default Navbar;
