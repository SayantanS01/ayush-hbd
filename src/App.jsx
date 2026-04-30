import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AdminProvider } from './context/AdminContext'
import Navbar from './components/layout/Navbar'
import PageLoader from './components/ui/PageLoader'
import MusicPlayer from './components/ui/MusicPlayer'

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Games = lazy(() => import('./pages/Games'))
const Wishes = lazy(() => import('./pages/Wishes'))
const Surprise = lazy(() => import('./pages/Surprise'))
const Admin = lazy(() => import('./pages/Admin'))

const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/games" element={<Games />} />
        <Route path="/wishes" element={<Wishes />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={<PageLoader />}>
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <MusicPlayer />
          </Suspense>
        </div>
      </Router>
    </AdminProvider>
  )
}

export default App
