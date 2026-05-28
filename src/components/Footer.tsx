import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionMarquee from "@/components/scroll/SectionMarquee";

const Footer: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const batteryApi = (
      navigator as Navigator & { getBattery?: () => Promise<BatteryManager> }
    ).getBattery;
    if (batteryApi && typeof batteryApi === "function") {
      batteryApi()
        .then((battery) => {
          const update = () => setBatteryLevel(Math.round(battery.level * 100));
          update();
          battery.addEventListener("levelchange", update);
        })
        .catch(() => setBatteryLevel(null));
    }
  }, []);

  return (
    <footer className="py-10 md:py-14 px-4 md:px-6 relative overflow-hidden section-transition">
      <div className="absolute inset-0 z-0 bokeh-bg opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-48 bg-gradient-to-t from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionMarquee
          text="cdhamdhere.xyz · OPEN TO WORK · "
          className="mb-8 border-accent/5"
          repeat={8}
        />

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
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-80" />

          <div className="px-6 py-8 md:px-10 md:py-10 text-center">
            <p className="font-mono text-xs text-muted-foreground mb-6 tracking-wide">
              {time} · Mumbai
              {batteryLevel !== null && (
                <span className="hidden md:inline">
                  {" "}
                  · <span className="text-accent/80">{batteryLevel}%</span>
                </span>
              )}
            </p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-muted-foreground text-sm md:text-base">Made with</span>
              <motion.span
                className="inline-flex text-xl md:text-2xl leading-none"
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1] }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 1.2, repeat: Infinity, repeatDelay: 2 }
                }
                aria-hidden
              >
                ❤️
              </motion.span>
              <span className="text-muted-foreground text-sm md:text-base">by</span>
              <span className="text-foreground font-semibold text-sm md:text-base">
                Chaitanya Dhamdhere
              </span>
            </motion.div>

            <p className="text-xs text-muted-foreground/70 mt-5">
              © {new Date().getFullYear()} · All rights reserved
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
