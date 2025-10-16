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
    <footer className="py-6 px-4 relative continuous-bg section-transition">
      {/* Animated orb background */}
      <motion.div 
        className="absolute -top-12 left-1/2 w-80 h-80 bg-gradient-accent opacity-10 rounded-full blur-3xl"
        initial={{ x: '-50%', y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="glass-enhanced border border-accent/20 rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Shimmer line */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Date & Time */}
          <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <motion.div 
              className="w-2 h-2 bg-accent rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span>{date}</span>
            <span>•</span>
            <motion.span 
              key={time}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {time}
            </motion.span>
          </div>

          {/* Battery with animated bar */}
          <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-24 h-3 rounded-sm border border-accent/30 bg-black/30 overflow-hidden">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, Math.min(100, batteryLevel ?? 0))}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span>
                {batteryLevel !== null ? (
                  <>
                    <span className="text-accent">{batteryLevel}%</span>{charging ? ' (charging)' : ''}
                  </>
                ) : (
                  <span className="text-accent">n/a</span>
                )}
              </span>
            </div>
          </div>

          {/* Signature */}
          <motion.div 
            className="text-sm text-muted-foreground"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          >
            Made with <span className="text-accent">❤</span> by <span className="text-accent">Chaitu</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;