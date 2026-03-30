'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiCupcake } from 'react-icons/gi';

const loadingLines = [
  'Preheating the oven…',
  'Mixing fresh ingredients…',
  'Folding in the love…',
  'Almost ready to serve…',
];

export default function PageLoader() {
  const [visible,  setVisible]  = useState(true);
  const [progress, setProgress] = useState(0);
  const [lineIdx,  setLineIdx]  = useState(0);

  useEffect(() => {
    // Smooth progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 14 + 4;
      });
    }, 120);

    // Cycle loading messages
    const msgInterval = setInterval(() => {
      setLineIdx((i) => (i + 1) % loadingLines.length);
    }, 700);

    // Dismiss after ~1.4 s
    const timeout = setTimeout(() => setVisible(false), 1450);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2C1A0E 0%, #5C3317 50%, #2C1A0E 100%)',
          }}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(198,124,78,0.18) 0%, transparent 70%)',
            }}
          />

          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.05 }}
            className="relative mb-6"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #C67C4E, #D4A853)' }}
            >
              <GiCupcake className="text-white text-4xl" />
            </div>
            {/* Ping ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold/50"
              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="font-playfair font-bold text-white text-4xl leading-none mb-1">
              Kanha
            </h1>
            <p className="font-nunito text-gold text-xs tracking-[0.35em] uppercase font-semibold">
              Bakers
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="w-56 mb-3"
          >
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #C67C4E, #D4A853)',
                  transition: 'width 0.12s ease',
                }}
              />
            </div>
          </motion.div>

          {/* Loading message */}
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="font-nunito text-white/50 text-xs tracking-wide"
            >
              {loadingLines[lineIdx]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}