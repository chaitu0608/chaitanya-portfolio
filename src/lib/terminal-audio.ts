/**
 * Lightweight procedural keyboard clicks — no network, no sprite decode.
 * One tick per keystroke (not down+up) with throttling for smooth loader performance.
 */

let ctx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;
let lastClickAt = 0;
const MIN_INTERVAL_MS = 28;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;
    ctx = new Ctx();
  }
  return ctx;
}

function getNoiseBuffer(audio: AudioContext): AudioBuffer {
  if (!noiseBuffer || noiseBuffer.sampleRate !== audio.sampleRate) {
    const length = Math.floor(audio.sampleRate * 0.02);
    noiseBuffer = audio.createBuffer(1, length, audio.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
  }
  return noiseBuffer;
}

export function unlockTerminalAudio(): void {
  const audio = getContext();
  if (audio?.state === "suspended") {
    void audio.resume();
  }
}

export function preloadTerminalAudio(): Promise<void> {
  getContext();
  return Promise.resolve();
}

export function playTerminalKeyClick(): void {
  const now = performance.now();
  if (now - lastClickAt < MIN_INTERVAL_MS) return;

  const audio = getContext();
  if (!audio) return;

  if (audio.state === "suspended") {
    void audio.resume().then(() => {
      if (audio.state === "running") playTerminalKeyClick();
    });
    return;
  }

  lastClickAt = now;
  const t = audio.currentTime;

  const gain = audio.createGain();
  gain.connect(audio.destination);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.12, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

  const tone = audio.createOscillator();
  tone.type = "square";
  tone.frequency.setValueAtTime(1900 + Math.random() * 150, t);
  tone.connect(gain);
  tone.start(t);
  tone.stop(t + 0.045);

  const noise = audio.createBufferSource();
  noise.buffer = getNoiseBuffer(audio);
  const noiseGain = audio.createGain();
  noiseGain.gain.setValueAtTime(0.05, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.022);
  noise.connect(noiseGain);
  noiseGain.connect(audio.destination);
  noise.start(t);
  noise.stop(t + 0.028);
}

/* ------------------------------------------------------------------ *
 * MacBook-style startup chime (plays after the terminal finishes).
 *
 * Drop your own clip at `public/sounds/startup.wav` and it will be used.
 * If the file is missing, a synthesized bell-chord swell plays instead so
 * the intro is never silent. Audio is allowed here because the Enter press
 * on the boot gate already unlocked the AudioContext (sticky activation).
 * ------------------------------------------------------------------ */

let chimeBuffer: AudioBuffer | null = null;
let chimeRequested = false;
let chimePlayed = false;

export function preloadStartupChime(url = "/sounds/startup.wav"): Promise<void> {
  const audio = getContext();
  if (!audio || chimeRequested) return Promise.resolve();
  chimeRequested = true;

  return fetch(url)
    .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject()))
    .then((buf) => audio.decodeAudioData(buf))
    .then((decoded) => {
      chimeBuffer = decoded;
    })
    .catch(() => {
      // No file (or decode failed) — the synthesized fallback will be used.
    });
}

/** Synthesized decaying-noise impulse response → cheap "hall" reverb tail. */
function createReverbImpulse(
  audio: AudioContext,
  seconds = 2.8,
  decay = 2.4,
): AudioBuffer {
  const rate = audio.sampleRate;
  const length = Math.max(1, Math.floor(rate * seconds));
  const impulse = audio.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return impulse;
}

/**
 * Emulates the modern (Big Sur+) MacBook startup chime: an F-major chord
 * spread across octaves, lightly strummed, with chorus detune, a warmth
 * filter, and a reverb tail for the signature "hall" bloom.
 */
function synthStartupChime(audio: AudioContext): void {
  const t = audio.currentTime;

  const master = audio.createGain();
  master.gain.setValueAtTime(0.0001, t);
  master.gain.exponentialRampToValueAtTime(0.55, t + 0.12);
  master.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
  master.connect(audio.destination);

  const convolver = audio.createConvolver();
  convolver.buffer = createReverbImpulse(audio);
  const reverbGain = audio.createGain();
  reverbGain.gain.value = 0.9;
  convolver.connect(reverbGain);
  reverbGain.connect(master);

  const filter = audio.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1100, t);
  filter.frequency.exponentialRampToValueAtTime(5200, t + 0.5);
  filter.Q.value = 0.6;
  filter.connect(master); // dry path
  filter.connect(convolver); // wet path

  // F-major chord (F2 · C3 · F3 · A3 · C4 · F4 · A4).
  const freqs = [87.31, 130.81, 174.61, 220.0, 261.63, 349.23, 440.0];
  const voices: ReadonlyArray<[OscillatorType, number, number]> = [
    ["sine", -3, 0.7],
    ["triangle", 4, 0.3],
  ];

  freqs.forEach((f, idx) => {
    // A tiny per-note offset makes the chord "bloom" like a strum.
    const start = t + idx * 0.012;
    for (const [type, detune, level] of voices) {
      const osc = audio.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(f, start);
      osc.detune.setValueAtTime(detune, start);

      const g = audio.createGain();
      const peak = (level / freqs.length) * 1.3;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(peak, start + 0.09);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 3.0);

      osc.connect(g);
      g.connect(filter);
      osc.start(start);
      osc.stop(start + 3.1);
    }
  });
}

export function playStartupChime(): void {
  if (chimePlayed) return;
  const audio = getContext();
  if (!audio) return;

  const run = () => {
    chimePlayed = true;
    if (chimeBuffer) {
      const src = audio.createBufferSource();
      src.buffer = chimeBuffer;
      const gain = audio.createGain();
      gain.gain.value = 0.6;
      src.connect(gain);
      gain.connect(audio.destination);
      src.start();
    } else {
      synthStartupChime(audio);
    }
  };

  if (audio.state === "suspended") {
    void audio.resume().then(run);
  } else {
    run();
  }
}

export function disposeTerminalAudio(): void {
  void ctx?.close();
  ctx = null;
  noiseBuffer = null;
  lastClickAt = 0;
  chimeBuffer = null;
  chimeRequested = false;
  chimePlayed = false;
}
