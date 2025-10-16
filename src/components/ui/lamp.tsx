import React from 'react';
import { motion } from 'framer-motion';

interface LampContainerProps {
  children: React.ReactNode;
  className?: string;
}

// A lightweight "lamp" backdrop inspired by Aceternity UI.
// It renders layered radial gradients with gentle motion that blends
// nicely with the site's existing neon-accent theme.
export const LampContainer: React.FC<LampContainerProps> = ({ children, className }) => {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {/* Base subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      {/* Central lamp glow */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(var(--accent-rgb),0.45), rgba(var(--accent-rgb),0.12) 55%, transparent 65%)',
          // Fallback if CSS var not present
        } as React.CSSProperties}
        initial={{ opacity: 0.35, scale: 0.95, y: 0 }}
        animate={{ opacity: 0.5, scale: 1, y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary tinted glow (matches background gradients used elsewhere) */}
      <motion.div
        className="pointer-events-none absolute -top-12 left-1/2 h-[360px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(56,189,248,0.25), rgba(168,85,247,0.18) 60%, transparent 70%)',
        }}
        initial={{ opacity: 0.25, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: 1.05 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default LampContainer;


