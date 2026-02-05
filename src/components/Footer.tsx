import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FooterProps {
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = () => {
  const [time, setTime] = useState<string>(() => new Date().toLocaleTimeString());
  const [date, setDate] = useState<string>(() => new Date().toLocaleDateString());
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
    const batteryApi = (navigator as Navigator & { getBattery?: () => Promise<BatteryManager> }).getBattery;
    if (batteryApi && typeof batteryApi === "function") {
      batteryApi()
        .then((battery) => {
          const update = () => {
            setBatteryLevel(Math.round(battery.level * 100));
            setCharging(battery.charging);
          };
          update();
          battery.addEventListener("levelchange", update);
          battery.addEventListener("chargingchange", update);
        })
        .catch(() => setBatteryLevel(null));
    }
  }, []);

  return (
    <footer className="py-14 px-4 md:px-6 relative overflow-hidden section-transition">
      {/* Modern glassmorphism background */}
      <div className="absolute inset-0 z-0 bokeh-bg opacity-25" />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)",
          backdropFilter: "blur(0)",
        }}
      />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-48 bg-gradient-to-t from-accent/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(32, 227, 178, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
          }}
        >
          {/* Inner glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-80" />

          <div className="px-6 py-8 md:px-10 md:py-10">
            {/* Top row: Date · Time · Battery (modern 3D-style cards) */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 pb-8 border-b border-white/5">
              {/* Date */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl min-w-[120px] justify-center"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Date</span>
                <span className="font-mono font-semibold text-foreground">{date}</span>
              </div>

              {/* Time */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl min-w-[120px] justify-center"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Time</span>
                <motion.span
                  key={time}
                  className="font-mono font-semibold text-foreground"
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {time}
                </motion.span>
              </div>

              {/* Battery – modern 3D pill */}
              {batteryLevel !== null && (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl min-w-[140px]"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 12px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider shrink-0">Battery</span>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className="h-2.5 flex-1 rounded-full overflow-hidden min-w-[64px] max-w-[80px]"
                      style={{
                        background: "rgba(0, 0, 0, 0.25)",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-emerald-400"
                        initial={{ width: "0%" }}
                        animate={{ width: `${batteryLevel}%` }}
                        transition={{ duration: 0.6 }}
                        style={{
                          boxShadow: "0 0 12px rgba(32, 227, 178, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}
                      />
                    </div>
                    <span className="font-mono text-sm font-semibold text-accent tabular-nums shrink-0">{batteryLevel}%</span>
                    {charging && <span className="text-emerald-400 text-sm shrink-0" aria-hidden>⚡</span>}
                  </div>
                </div>
              )}
            </div>

            {/* Signature */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 text-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-muted-foreground text-sm md:text-base">Made with</span>
              <motion.span
                className="inline-flex text-xl md:text-2xl leading-none"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                aria-hidden
              >
                ❤️
              </motion.span>
              <span className="text-muted-foreground text-sm md:text-base">by</span>
              <span className="text-foreground font-semibold text-sm md:text-base">
                Chaitanya Dhamdhere
              </span>
            </motion.div>

            <p className="text-xs text-muted-foreground/70 text-center mt-5">
              © {new Date().getFullYear()} · All rights reserved
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
