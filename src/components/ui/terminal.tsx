import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  playTerminalKeyClick,
  preloadTerminalAudio,
  unlockTerminalAudio,
} from "@/lib/terminal-audio";

export { preloadTerminalAudio, unlockTerminalAudio };

function useInView(ref: React.RefObject<HTMLElement | null>, once = true) {
  const [inView, setInView] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && triggered.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          setInView(true);
          if (once) {
            triggered.current = true;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once]);

  return inView;
}

type TokenType =
  | "command"
  | "flag"
  | "string"
  | "number"
  | "operator"
  | "path"
  | "variable"
  | "comment"
  | "default";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeBash(text: string): Token[] {
  const tokens: Token[] = [];
  const words = text.split(/(\s+)/);

  let isFirstWord = true;

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ type: "default", value: word });
      continue;
    }

    if (word.startsWith("#")) {
      tokens.push({ type: "comment", value: word });
      continue;
    }

    if (word.startsWith("$")) {
      tokens.push({ type: "variable", value: word });
      isFirstWord = false;
      continue;
    }

    if (word.startsWith("--") || word.startsWith("-")) {
      tokens.push({ type: "flag", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^["'].*["']$/.test(word)) {
      tokens.push({ type: "string", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^\d+$/.test(word)) {
      tokens.push({ type: "number", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^[|>&<]+$/.test(word)) {
      tokens.push({ type: "operator", value: word });
      isFirstWord = true;
      continue;
    }

    if (word.includes("/") || word.startsWith(".") || word.startsWith("~")) {
      tokens.push({ type: "path", value: word });
      isFirstWord = false;
      continue;
    }

    if (isFirstWord) {
      tokens.push({ type: "command", value: word });
      isFirstWord = false;
      continue;
    }

    tokens.push({ type: "default", value: word });
  }

  return tokens;
}

const tokenColors: Record<TokenType, string> = {
  command: "text-emerald-400",
  flag: "text-sky-400",
  string: "text-amber-300",
  number: "text-purple-400",
  operator: "text-red-400",
  path: "text-cyan-300",
  variable: "text-pink-400",
  comment: "text-zinc-500",
  default: "text-zinc-300",
};

function SyntaxHighlightedText({ text }: { text: string }) {
  const tokens = tokenizeBash(text);

  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={tokenColors[token.type]}>
          {token.value}
        </span>
      ))}
    </>
  );
}

interface TerminalLine {
  type: "command" | "output";
  content: string;
}

export interface TerminalProps {
  commands: string[];
  outputs?: Record<number, string[]>;
  /** @deprecated Use windowTitle instead */
  username?: string;
  windowTitle?: string;
  className?: string;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  initialDelay?: number;
  enableSound?: boolean;
  /** @deprecated Procedural audio is instant; kept for API compatibility */
  waitForAudio?: boolean;
  startImmediately?: boolean;
  onDone?: () => void;
  contentClassName?: string;
}

function TerminalCursor({ visible }: { visible: boolean }) {
  return (
    <span
      className={cn(
        "log-terminal-cursor ml-0.5 inline-block h-4 w-2 align-middle bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.65)] transition-opacity duration-100",
        !visible && "opacity-0",
      )}
      aria-hidden
    />
  );
}

export function Terminal({
  commands = ["npx shadcn@latest init"],
  outputs = {},
  windowTitle = "~/boot.sh",
  className,
  typingSpeed = 50,
  delayBetweenCommands = 800,
  initialDelay = 500,
  enableSound = true,
  startImmediately = false,
  onDone,
  contentClassName,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const onDoneCalled = useRef(false);
  const playKeyRef = useRef<(char?: string) => void>(() => {});
  const observedInView = useInView(containerRef);
  const inView = startImmediately || observedInView;

  const playKey = useCallback(
    (char?: string) => {
      if (enableSound) playTerminalKeyClick(char);
    },
    [enableSound],
  );
  playKeyRef.current = playKey;

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [commandIdx, setCommandIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [outputIdx, setOutputIdx] = useState(-1);
  const [phase, setPhase] = useState<
    "idle" | "typing" | "executing" | "outputting" | "pausing" | "done"
  >("idle");
  const [cursorVisible, setCursorVisible] = useState(true);

  const currentCommand = commands[commandIdx] || "";
  const currentOutputs = useMemo(
    () => outputs[commandIdx] || [],
    [outputs, commandIdx],
  );
  const isLastCommand = commandIdx === commands.length - 1;

  useEffect(() => {
    if (!inView || phase !== "idle") return;
    const t = setTimeout(() => setPhase("typing"), initialDelay);
    return () => clearTimeout(t);
  }, [inView, phase, initialDelay]);

  useEffect(() => {
    if (phase !== "typing") return;

    if (charIdx < currentCommand.length) {
      playKeyRef.current(currentCommand[charIdx]);
      const t = setTimeout(
        () => {
          setCurrentText(currentCommand.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        },
        typingSpeed + Math.random() * 12,
      );
      return () => clearTimeout(t);
    } else {
      playKeyRef.current("\n");
      const t = setTimeout(() => {
        setPhase("executing");
      }, 35);
      return () => clearTimeout(t);
    }
  }, [phase, charIdx, currentCommand, typingSpeed]);

  useEffect(() => {
    if (phase !== "executing") return;

    setLines((prev) => [...prev, { type: "command", content: currentCommand }]);
    setCurrentText("");

    if (currentOutputs.length > 0) {
      setOutputIdx(0);
      setPhase("outputting");
    } else if (isLastCommand) {
      setPhase("done");
    } else {
      setPhase("pausing");
    }
  }, [phase, currentCommand, currentOutputs.length, isLastCommand]);

  useEffect(() => {
    if (phase !== "outputting") return;

    if (outputIdx >= 0 && outputIdx < currentOutputs.length) {
      const t = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: "output", content: currentOutputs[outputIdx] },
        ]);
        setOutputIdx((i) => i + 1);
      }, 70);
      return () => clearTimeout(t);
    } else if (outputIdx >= currentOutputs.length) {
      const t = setTimeout(() => {
        if (isLastCommand) {
          setPhase("done");
        } else {
          setPhase("pausing");
        }
      }, 140);
      return () => clearTimeout(t);
    }
  }, [phase, outputIdx, currentOutputs, isLastCommand]);

  useEffect(() => {
    if (phase !== "pausing") return;
    const t = setTimeout(() => {
      setCharIdx(0);
      setOutputIdx(-1);
      setCommandIdx((c) => c + 1);
      setPhase("typing");
    }, delayBetweenCommands);
    return () => clearTimeout(t);
  }, [phase, delayBetweenCommands]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, phase]);

  useEffect(() => {
    if (phase === "done" && !onDoneCalled.current) {
      onDoneCalled.current = true;
      onDone?.();
    }
  }, [phase, onDone]);

  const prompt = <span className="text-emerald-400">$ </span>;

  return (
    <div
      ref={containerRef}
      className={cn("mx-auto w-full max-w-xl px-4 font-mono text-xs", className)}
    >
      <div className="about-dossier log-terminal overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/60 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2.5 sm:px-5">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/75" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/75" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/75" />
          </div>
          <span className="font-mono text-xs text-zinc-500 sm:text-sm">
            {windowTitle}
          </span>
        </div>

        <div className="about-terminal-body relative">
          <div
            className="about-terminal-scanline pointer-events-none absolute inset-0 z-[1]"
            aria-hidden
          />
          <div
            className="about-terminal-glow pointer-events-none absolute inset-0 z-[1]"
            aria-hidden
          />

          <div
            ref={contentRef}
            className={cn(
              "no-visible-scrollbar relative z-[2] h-80 overflow-y-auto p-4 font-mono text-zinc-300",
              contentClassName,
            )}
          >
            {lines.map((line, i) => (
              <div key={i} className="leading-relaxed whitespace-pre-wrap">
                {line.type === "command" ? (
                  <span>
                    {prompt}
                    <SyntaxHighlightedText text={line.content} />
                  </span>
                ) : (
                  <span className="text-zinc-400">{line.content}</span>
                )}
              </div>
            ))}

            {phase === "typing" && (
              <div className="leading-relaxed whitespace-pre-wrap">
                {prompt}
                <SyntaxHighlightedText text={currentText} />
                <TerminalCursor visible />
              </div>
            )}

            {(phase === "done" ||
              phase === "pausing" ||
              phase === "outputting") && (
              <div className="leading-relaxed whitespace-pre-wrap">
                {prompt}
                <TerminalCursor visible={cursorVisible} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
