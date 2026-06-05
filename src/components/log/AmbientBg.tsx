import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSectionSpy } from "./useSectionSpy";

const GRAIN_SIZE = 128;
const DUST_CORE = "248, 113, 113";
const DUST_GLOW = "74, 222, 128";
const HALO_RADIUS_MULT = 2.2;
const HALO_OPACITY_MULT = 0.12;

const SECTION_IDS = [
  "about",
  "work",
  "now",
  "experience",
  "stack",
  "contact",
] as const;

const SECTION_TINTS: Record<string, string> = {
  about:
    "radial-gradient(ellipse 90% 70% at 20% 15%, rgba(74, 222, 128, 0.08) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 75% 20%, rgba(161, 161, 170, 0.07) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 30% 80%, rgba(251, 191, 36, 0.04) 0%, transparent 45%)",
  work: "radial-gradient(ellipse 85% 65% at 80% 30%, rgba(96, 165, 250, 0.06) 0%, transparent 50%), radial-gradient(ellipse 70% 55% at 15% 70%, rgba(113, 113, 122, 0.05) 0%, transparent 45%)",
  now: "radial-gradient(ellipse 75% 60% at 50% 40%, rgba(45, 212, 191, 0.07) 0%, transparent 55%)",
  experience:
    "radial-gradient(ellipse 80% 65% at 25% 50%, rgba(251, 191, 36, 0.06) 0%, transparent 50%), radial-gradient(ellipse 60% 45% at 85% 80%, rgba(113, 113, 122, 0.05) 0%, transparent 40%)",
  stack:
    "radial-gradient(ellipse 70% 55% at 60% 30%, rgba(161, 161, 170, 0.06) 0%, transparent 50%)",
  contact:
    "radial-gradient(ellipse 85% 70% at 50% 60%, rgba(74, 222, 128, 0.09) 0%, transparent 55%)",
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

function buildGrainTile(): string {
  const canvas = document.createElement("canvas");
  canvas.width = GRAIN_SIZE;
  canvas.height = GRAIN_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const imageData = ctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const v = Math.floor(Math.random() * 256);
    imageData.data[i] = v;
    imageData.data[i + 1] = v;
    imageData.data[i + 2] = v;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

function createParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.17 + 0.08,
  }));
}

function particleCount(): number {
  return window.innerWidth < 768 ? 80 : 200;
}

export function AmbientBg() {
  const activeSection = useSectionSpy(SECTION_IDS);
  const grainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const grainOffsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(true);

  const tint =
    SECTION_TINTS[activeSection] ?? SECTION_TINTS.about;

  useEffect(() => {
    const grainEl = grainRef.current;
    const canvas = canvasRef.current;
    if (!grainEl || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    grainEl.style.backgroundImage = `url(${buildGrainTile()})`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tickGrain = () => {
      if (reducedMotion) return;
      grainOffsetRef.current = (grainOffsetRef.current + 0.15) % GRAIN_SIZE;
      grainEl.style.backgroundPosition = `${grainOffsetRef.current}px ${grainOffsetRef.current * 0.7}px`;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(particleCount(), w, h);
    };

    const drawParticles = (animate: boolean) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * HALO_RADIUS_MULT, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DUST_GLOW}, ${p.opacity * HALO_OPACITY_MULT})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DUST_CORE}, ${p.opacity})`;
        ctx.fill();
      }
    };

    const loop = () => {
      if (!runningRef.current) {
        rafRef.current = null;
        return;
      }
      tickGrain();
      drawParticles(true);
      rafRef.current = requestAnimationFrame(loop);
    };

    const onResize = () => {
      resize();
      if (reducedMotion) drawParticles(false);
    };

    resize();
    window.addEventListener("resize", onResize);

    if (reducedMotion) {
      drawParticles(false);
    } else {
      rafRef.current = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      const visible = document.visibilityState === "visible";
      runningRef.current = visible;
      if (visible && !reducedMotion && rafRef.current === null) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 15% 10%, rgba(74, 222, 128, 0.07) 0%, transparent 55%)",
            "radial-gradient(ellipse 70% 50% at 85% 90%, rgba(113, 113, 122, 0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(74, 222, 128, 0.02) 0%, transparent 60%)",
            "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0, 0, 0, 0.4) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: tint,
          transition: "background 1.2s ease-in-out",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      <div
        ref={grainRef}
        className={cn(
          "absolute inset-[-50%] h-[200%] w-[200%]",
          "opacity-[0.045] mix-blend-soft-light",
        )}
        style={{
          backgroundSize: `${GRAIN_SIZE}px ${GRAIN_SIZE}px`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
