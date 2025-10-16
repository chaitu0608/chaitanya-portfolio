import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface FooterProps {
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState<boolean | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const batteryApi: any = (navigator as any).getBattery;
    if (batteryApi && typeof batteryApi === 'function') {
      (navigator as any).getBattery().then((battery: any) => {
        const update = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setCharging(!!battery.charging);
        };
        update();
        battery.addEventListener('levelchange', update);
        battery.addEventListener('chargingchange', update);
      }).catch(() => {
        setBatteryLevel(null);
      });
    }
  }, []);

  return (
    <footer className="py-8 px-4 relative continuous-bg section-transition">
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 bokeh-bg"
        style={{ opacity: 0.1 }}
      />
      
      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, -4, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
            </div>
            
      {/* Animated orb background */}
      <motion.div 
        className="absolute -top-16 left-1/2 w-96 h-96 bg-gradient-accent opacity-8 rounded-full blur-3xl"
        initial={{ x: '-50%', y: 0 }}
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="glass-enhanced border border-accent/30 rounded-3xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Shimmer line */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Date & Time */}
          <motion.div 
            className="flex items-center gap-4 text-sm font-mono text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-3 h-3 bg-gradient-to-r from-accent to-accent/60 rounded-full"
              animate={{ 
                scale: [1, 1.4, 1], 
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                  "0 0 0 0 rgba(var(--accent), 0.4)",
                  "0 0 0 8px rgba(var(--accent), 0)",
                  "0 0 0 0 rgba(var(--accent), 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-semibold">{date}</span>
            <span className="text-accent">•</span>
            <motion.span 
              key={time}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-semibold"
            >
              {time}
            </motion.span>
          </motion.div>

          {/* Battery with enhanced animated bar */}
          <motion.div 
            className="flex items-center gap-4 text-sm font-mono text-muted-foreground"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <div className="w-28 h-4 rounded-lg border border-accent/40 bg-black/40 overflow-hidden relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-accent to-accent/80 relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, Math.min(100, batteryLevel ?? 0))}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
            </div>
              <span className="font-semibold">
                {batteryLevel !== null ? (
                  <>
                    <span className="text-accent">{batteryLevel}%</span>
                    {charging && <span className="text-green-400 ml-1">⚡</span>}
                  </>
                ) : (
                  <span className="text-accent">n/a</span>
                )}
              </span>
            </div>
          </motion.div>

          {/* Enhanced Signature */}
          <motion.div 
            className="text-sm text-muted-foreground flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              hover: { type: 'spring', stiffness: 200, damping: 12 }
            }}
          >
            <span>Made with</span>
            <motion.span 
              className="text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ❤
            </motion.span>
            <span>by</span>
            <span className="text-accent font-semibold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Chaitu
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;