export const LOADER_COMMANDS = [
  "node --version",
  "npm ci",
  "npm run dev",
  "open http://localhost:5173",
];

export const LOADER_OUTPUTS: Record<number, string[]> = {
  0: ["v20.11.1"],
  1: ["✓ 312 packages installed in 1.4s"],
  2: [
    "VITE v5.4.10  ready in 412 ms",
    "➜  Local: http://localhost:5173/",
  ],
  3: ["✓ Chaitu's Portfolio is ready — launching…"],
};
