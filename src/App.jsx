import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import BirthdayScene from './BirthdayScene';
import Countdown from './Countdown';
import WishCard from './WishCard';
import MusicPlayer from './MusicPlayer';

import './App.css';

function App() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [startMusic, setStartMusic] = useState(false);

  const fireConfetti = () => {
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ['#FFD700', '#2980b9', '#1a5276', '#48c9b0', '#dce6ec', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleStart = () => {
    setShowOverlay(false);
    setStartMusic(true);
    fireConfetti();
  };

  return (
    <div className="app-main">
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="overlay"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Floating decorative emojis */}
            <div className="overlay-floaties">
              <span className="floatie" style={{ top: '10%', left: '15%', animationDelay: '0s' }}>🎈</span>
              <span className="floatie" style={{ top: '25%', right: '10%', animationDelay: '1s' }}>💖</span>
              <span className="floatie" style={{ bottom: '20%', left: '10%', animationDelay: '0.5s' }}>🎂</span>
              <span className="floatie" style={{ top: '15%', right: '25%', animationDelay: '1.5s' }}>✨</span>
              <span className="floatie" style={{ bottom: '30%', right: '15%', animationDelay: '0.8s' }}>🌹</span>
              <span className="floatie" style={{ top: '50%', left: '5%', animationDelay: '2s' }}>🎉</span>
            </div>

            <div className="overlay-content">
              <motion.div
                className="overlay-emoji-top"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                🎂
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="overlay-title"
              >
                Une surprise pour toi, Maman...
              </motion.h1>
              <motion.p
                className="overlay-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Clique pour découvrir quelque chose de spécial 💕
              </motion.p>
              <motion.button
                className="btn-primary"
                onClick={handleStart}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ouvrir ma surprise ❤️
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="app-container">
        <BirthdayScene />

        {/* Main Title */}
        <motion.div
          className="main-title-section"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="main-title">🎉 Joyeux Anniversaire 🎉</h1>
          <h2 className="main-subtitle">Maman</h2>
        </motion.div>

        <Countdown targetDate="Feb 28, 2026 00:00:00" />

        <WishCard />

        <MusicPlayer autoPlayAfterInteract={startMusic} />
      </div>
    </div>
  );
}

export default App;
