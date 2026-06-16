import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  KEYBOARD_SPRITE_URL,
  SOUND_DEFINES_DOWN,
  SOUND_DEFINES_UP,
} from "@/lib/keyboard-sprite";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled,
} from "@tabler/icons-react";

// Sprite metadata is shared with the boot-loader terminal; see
// `src/lib/keyboard-sprite.ts` for the full per-key timing tables.

// Map key codes to display labels
const KEY_DISPLAY_LABELS: Record<string, string> = {
  Escape: "esc",
  Backspace: "delete",
  Tab: "tab",
  Enter: "return",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  ControlLeft: "control",
  ControlRight: "control",
  AltLeft: "option",
  AltRight: "option",
  MetaLeft: "command",
  MetaRight: "command",
  Space: "space",
  CapsLock: "caps",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Backquote: "`",
  Minus: "-",
  Equal: "=",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Slash: "/",
};

const getKeyDisplayLabel = (keyCode: string): string => {
  if (KEY_DISPLAY_LABELS[keyCode]) return KEY_DISPLAY_LABELS[keyCode];
  if (keyCode.startsWith("Key")) return keyCode.slice(3);
  if (keyCode.startsWith("Digit")) return keyCode.slice(5);
  if (keyCode.startsWith("F") && keyCode.length <= 3) return keyCode;
  return keyCode;
};

interface KeyboardContextType {
  playSoundDown: (keyCode: string) => void;
  playSoundUp: (keyCode: string) => void;
  pressedKeys: Set<string>;
  setPressed: (keyCode: string) => void;
  setReleased: (keyCode: string) => void;
  lastPressedKey: string | null;
  triggerEnter: () => void;
}

const KeyboardContext = createContext<KeyboardContextType | null>(null);

const useKeyboardSound = () => {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error("useKeyboardSound must be used within KeyboardProvider");
  }
  return context;
};

const KeyboardProvider = ({
  children,
  enableSound = false,
  containerRef,
  onEnter,
  alwaysListen = false,
}: {
  children: React.ReactNode;
  enableSound?: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onEnter?: () => void;
  alwaysListen?: boolean;
}) => {
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  const triggerEnter = useCallback(() => {
    onEnterRef.current?.();
  }, []);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(alwaysListen);

  useEffect(() => {
    if (alwaysListen) setIsVisible(true);
  }, [alwaysListen]);

  useEffect(() => {
    if (!enableSound) return;

    // Initialize AudioContext and load sound file
    const initAudio = async () => {
      try {
        audioContextRef.current = new AudioContext();
        const response = await fetch(KEYBOARD_SPRITE_URL);
        if (!response.ok) {
          console.warn("Sound file not available");
          return;
        }
        const arrayBuffer = await response.arrayBuffer();
        audioBufferRef.current =
          await audioContextRef.current.decodeAudioData(arrayBuffer);
        setSoundLoaded(true);
      } catch (error) {
        console.warn("Failed to load sound:", error);
      }
    };

    initAudio();

    return () => {
      audioContextRef.current?.close();
    };
  }, [enableSound]);

  const playSoundDown = useCallback(
    (keyCode: string) => {
      if (!enableSound || !soundLoaded) return;
      if (!audioContextRef.current || !audioBufferRef.current) return;

      const soundDef = SOUND_DEFINES_DOWN[keyCode];
      if (!soundDef) return;

      const [startMs, durationMs] = soundDef;
      const startTime = startMs / 1000;
      const duration = durationMs / 1000;

      // Resume audio context if suspended (browser autoplay policy)
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0, startTime, duration);
    },
    [enableSound, soundLoaded],
  );

  const playSoundUp = useCallback(
    (keyCode: string) => {
      if (!enableSound || !soundLoaded) return;
      if (!audioContextRef.current || !audioBufferRef.current) return;

      const soundDef = SOUND_DEFINES_UP[keyCode];
      if (!soundDef) return;

      const [startMs, durationMs] = soundDef;
      const startTime = startMs / 1000;
      const duration = durationMs / 1000;

      // Resume audio context if suspended (browser autoplay policy)
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0, startTime, duration);
    },
    [enableSound, soundLoaded],
  );

  const setPressed = useCallback((keyCode: string) => {
    setPressedKeys((prev) => new Set(prev).add(keyCode));
    setLastPressedKey(keyCode);
  }, []);

  const setReleased = useCallback((keyCode: string) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(keyCode);
      return next;
    });
  }, []);

  // Track visibility with IntersectionObserver
  useEffect(() => {
    if (alwaysListen) return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, alwaysListen]);

  // Handle physical keyboard events (only when visible)
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent repeat events
      if (e.repeat) return;

      const keyCode = e.code;
      playSoundDown(keyCode);
      setPressed(keyCode);
      if (keyCode === "Enter") {
        triggerEnter();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyCode = e.code;
      playSoundUp(keyCode);
      setReleased(keyCode);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    isVisible,
    playSoundDown,
    playSoundUp,
    setPressed,
    setReleased,
    triggerEnter,
  ]);

  return (
    <KeyboardContext.Provider
      value={{
        playSoundDown,
        playSoundUp,
        pressedKeys,
        setPressed,
        setReleased,
        lastPressedKey,
        triggerEnter,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

const KeystrokePreview = ({ idleLabel }: { idleLabel?: string }) => {
  const { lastPressedKey, pressedKeys } = useKeyboardSound();
  const [displayKey, setDisplayKey] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (lastPressedKey) {
      // Clear display if space or shift is pressed
      if (
        lastPressedKey === "Space" ||
        lastPressedKey === "ShiftLeft" ||
        lastPressedKey === "ShiftRight"
      ) {
        setDisplayKey(null);
        return;
      }

      setDisplayKey(getKeyDisplayLabel(lastPressedKey));
      setAnimationKey((prev) => prev + 1);
    }
  }, [lastPressedKey]);

  const isPressed = pressedKeys.size > 0;
  const showIdleHint = Boolean(idleLabel) && !displayKey && pressedKeys.size === 0;

  return (
    <div className="relative flex h-12 w-full items-center justify-center">
      {showIdleHint && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 0.4, y: 0 }}
          className="absolute font-mono text-xl font-black tracking-wide text-neutral-500"
        >
          {idleLabel}
        </motion.p>
      )}
      <AnimatePresence mode="popLayout">
        {displayKey && (
          <motion.div
            key={animationKey}
            layout
            initial={{ opacity: 0, scale: 0.5, y: 5 }}
            animate={{
              opacity: 1,
              scale: isPressed ? 0.95 : 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: -5 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
            className="absolute flex items-center justify-center rounded-lg px-4 py-2 font-mono text-2xl font-black text-neutral-700"
          >
            <motion.span
              initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              animate={{ opacity: 0.6, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.05 }}
              className="text-2xl"
            >
              {displayKey}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Keyboard = ({
  className,
  enableSound = false,
  showPreview = false,
  onEnter,
  alwaysListen = false,
  autoZoom = true,
  idlePreviewLabel,
}: {
  className?: string;
  enableSound?: boolean;
  showPreview?: boolean;
  onEnter?: () => void;
  alwaysListen?: boolean;
  /** When false, keyboard renders at natural size (for boot gate fit-to-screen). */
  autoZoom?: boolean;
  /** Ghost label in keystroke preview when idle (boot gate hint). */
  idlePreviewLabel?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <KeyboardProvider
      enableSound={enableSound}
      containerRef={containerRef}
      onEnter={onEnter}
      alwaysListen={alwaysListen}
    >
      <div
        ref={containerRef}
        data-keyboard-root
        className={cn(
          "mx-auto w-fit",
          autoZoom &&
            "[zoom:0.6] min-[480px]:[zoom:0.75] sm:[zoom:1.25] md:[zoom:1.5] lg:[zoom:1.75] xl:[zoom:2]",
          className,
        )}
      >
        {showPreview && <KeystrokePreview idleLabel={idlePreviewLabel} />}
        <Keypad />
      </div>
    </KeyboardProvider>
  );
};

export const Keypad = () => {
  return (
    <div
      data-keyboard-keypad
      className="h-full w-fit rounded-xl bg-neutral-200 p-1 shadow-sm ring-1 shadow-black/5 ring-black/5"
    >
      {/* Function Row */}
      <Row>
        <Key
          keyCode="Escape"
          containerClassName="rounded-tl-xl"
          className="w-10 rounded-tl-lg"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>esc</span>
        </Key>
        <Key keyCode="F1">
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1">F1</span>
        </Key>
        <Key keyCode="F2">
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1">F2</span>
        </Key>
        <Key keyCode="F3">
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1">F3</span>
        </Key>
        <Key keyCode="F4">
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1">F4</span>
        </Key>
        <Key keyCode="F5">
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1">F5</span>
        </Key>
        <Key keyCode="F6">
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1">F6</span>
        </Key>
        <Key keyCode="F7">
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1">F7</span>
        </Key>
        <Key keyCode="F8">
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1">F8</span>
        </Key>
        <Key keyCode="F9">
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1">F9</span>
        </Key>
        <Key keyCode="F10">
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1">F10</span>
        </Key>
        <Key keyCode="F11">
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1">F11</span>
        </Key>
        <Key keyCode="F12">
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1">F12</span>
        </Key>
        <Key containerClassName="rounded-tr-xl" className="rounded-tr-lg">
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-300 p-px">
            <div className="h-full w-full rounded-full bg-neutral-100" />
          </div>
        </Key>
      </Row>

      {/* Number Row */}
      <Row>
        <Key keyCode="Backquote">
          <span>~</span>
          <span>`</span>
        </Key>
        <Key keyCode="Digit1">
          <span>!</span>
          <span>1</span>
        </Key>
        <Key keyCode="Digit2">
          <span>@</span>
          <span>2</span>
        </Key>
        <Key keyCode="Digit3">
          <span>#</span>
          <span>3</span>
        </Key>
        <Key keyCode="Digit4">
          <span>$</span>
          <span>4</span>
        </Key>
        <Key keyCode="Digit5">
          <span>%</span>
          <span>5</span>
        </Key>
        <Key keyCode="Digit6">
          <span>^</span>
          <span>6</span>
        </Key>
        <Key keyCode="Digit7">
          <span>&</span>
          <span>7</span>
        </Key>
        <Key keyCode="Digit8">
          <span>*</span>
          <span>8</span>
        </Key>
        <Key keyCode="Digit9">
          <span>(</span>
          <span>9</span>
        </Key>
        <Key keyCode="Digit0">
          <span>)</span>
          <span>0</span>
        </Key>
        <Key keyCode="Minus">
          <span>—</span>
          <span>_</span>
        </Key>
        <Key keyCode="Equal">
          <span>+</span>
          <span>=</span>
        </Key>
        <Key
          keyCode="Backspace"
          className="w-10"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
        >
          <span>delete</span>
        </Key>
      </Row>

      {/* QWERTY Row */}
      <Row>
        <Key
          keyCode="Tab"
          className="w-10"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>tab</span>
        </Key>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
          <Key key={letter} keyCode={`Key${letter}`}>
            {letter}
          </Key>
        ))}
        <Key keyCode="BracketLeft">
          <span>{`{`}</span>
          <span>{`[`}</span>
        </Key>
        <Key keyCode="BracketRight">
          <span>{`}`}</span>
          <span>{`]`}</span>
        </Key>
        <Key keyCode="Backslash">
          <span>{`|`}</span>
          <span>{`\\`}</span>
        </Key>
      </Row>

      {/* Home Row */}
      <Row>
        <Key
          keyCode="CapsLock"
          className="w-[2.8rem]"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>caps lock</span>
        </Key>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
          <Key key={letter} keyCode={`Key${letter}`}>
            {letter}
          </Key>
        ))}
        <Key keyCode="Semicolon">
          <span>:</span>
          <span>;</span>
        </Key>
        <Key keyCode="Quote">
          <span>{`"`}</span>
          <span>{`'`}</span>
        </Key>
        <Key
          keyCode="Enter"
          className="w-[2.85rem]"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
        >
          <span>return</span>
        </Key>
      </Row>

      {/* Bottom Letter Row */}
      <Row>
        <Key
          keyCode="ShiftLeft"
          className="w-[3.65rem]"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>shift</span>
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
          <Key key={letter} keyCode={`Key${letter}`}>
            {letter}
          </Key>
        ))}
        <Key keyCode="Comma">
          <span>{`<`}</span>
          <span>,</span>
        </Key>
        <Key keyCode="Period">
          <span>{`>`}</span>
          <span>.</span>
        </Key>
        <Key keyCode="Slash">
          <span>?</span>
          <span>/</span>
        </Key>
        <Key
          keyCode="ShiftRight"
          className="w-[3.65rem]"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
        >
          <span>shift</span>
        </Key>
      </Row>

      {/* Modifier Row */}
      <Row>
        <ModifierKey
          keyCode="Fn"
          containerClassName="rounded-bl-xl"
          className="rounded-bl-lg"
        >
          <span>fn</span>
          <IconWorld className="h-[6px] w-[6px]" />
        </ModifierKey>
        <ModifierKey keyCode="ControlLeft">
          <IconChevronUp className="h-[6px] w-[6px]" />
          <span>control</span>
        </ModifierKey>
        <ModifierKey keyCode="AltLeft">
          <OptionKey className="h-[6px] w-[6px]" />
          <span>option</span>
        </ModifierKey>
        <ModifierKey keyCode="MetaLeft" className="w-8">
          <IconCommand className="h-[6px] w-[6px]" />
          <span>command</span>
        </ModifierKey>
        <Key keyCode="Space" className="w-[8.2rem]" />
        <ModifierKey keyCode="MetaRight" className="w-8">
          <IconCommand className="h-[6px] w-[6px]" />
          <span>command</span>
        </ModifierKey>
        <ModifierKey keyCode="AltRight">
          <OptionKey className="h-[6px] w-[6px]" />
          <span>option</span>
        </ModifierKey>
        {/* Arrow Keys */}
        <div className="flex h-6 w-[4.9rem] items-center justify-end rounded-[4px] p-[0.5px]">
          <Key keyCode="ArrowLeft" className="h-6 w-6">
            <IconCaretLeftFilled className="h-[6px] w-[6px]" />
          </Key>
          <div className="flex flex-col">
            <Key keyCode="ArrowUp" className="h-3 w-6">
              <IconCaretUpFilled className="h-[6px] w-[6px]" />
            </Key>
            <Key keyCode="ArrowDown" className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </Key>
          </div>
          <Key
            keyCode="ArrowRight"
            containerClassName="rounded-br-xl"
            className="h-6 w-6 rounded-br-lg"
          >
            <IconCaretRightFilled className="h-[6px] w-[6px]" />
          </Key>
        </div>
      </Row>
    </div>
  );
};

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">{children}</div>
);

const Key = ({
  className,
  childrenClassName,
  containerClassName,
  children,
  keyCode,
}: {
  className?: string;
  childrenClassName?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  keyCode?: string;
}) => {
  const {
    playSoundDown,
    playSoundUp,
    pressedKeys,
    setPressed,
    setReleased,
    triggerEnter,
  } = useKeyboardSound();
  const isPressed = keyCode ? pressedKeys.has(keyCode) : false;
  const isEnter = keyCode === "Enter";

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!keyCode) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    playSoundDown(keyCode);
    setPressed(keyCode);
    if (keyCode === "Enter") {
      triggerEnter();
    }
  };

  const handlePointerUp = () => {
    if (keyCode && isPressed) {
      playSoundUp(keyCode);
      setReleased(keyCode);
    }
  };

  const handlePointerCancel = () => {
    if (keyCode && isPressed) {
      setReleased(keyCode);
    }
  };

  return (
    <div className={cn("relative rounded-[4px] p-[0.5px]", containerClassName)}>
      {isEnter && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-[2px] rounded-[5px]"
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.45, 1, 0.45],
            boxShadow: [
              "0 0 4px 0px rgba(251,191,36,0.35)",
              "0 0 16px 5px rgba(251,191,36,0.85)",
              "0 0 4px 0px rgba(251,191,36,0.35)",
            ],
          }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      )}
      <button
        type="button"
        data-key={keyCode}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
        style={{ touchAction: "manipulation" }}
        className={cn(
          "relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3.5px] bg-gray-100 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,1)_inset] transition-transform duration-75 select-none active:scale-[0.98]",
          isPressed &&
            "scale-[0.98] bg-gray-100/80 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,0.5)]",
          isEnter && "bg-amber-50 ring-2 ring-amber-400 ring-inset",
          className,
        )}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center text-[5px] text-neutral-700",
            isEnter && "font-semibold text-amber-700",
            childrenClassName,
          )}
        >
          {children}
        </div>
      </button>
    </div>
  );
};

const ModifierKey = ({
  className,
  containerClassName,
  children,
  keyCode,
}: {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  keyCode?: string;
}) => {
  const {
    playSoundDown,
    playSoundUp,
    pressedKeys,
    setPressed,
    setReleased,
    triggerEnter,
  } = useKeyboardSound();
  const isPressed = keyCode ? pressedKeys.has(keyCode) : false;

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!keyCode) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    playSoundDown(keyCode);
    setPressed(keyCode);
    if (keyCode === "Enter") {
      triggerEnter();
    }
  };

  const handlePointerUp = () => {
    if (keyCode && isPressed) {
      playSoundUp(keyCode);
      setReleased(keyCode);
    }
  };

  const handlePointerCancel = () => {
    if (keyCode && isPressed) {
      setReleased(keyCode);
    }
  };

  return (
    <div className={cn("rounded-[4px] p-[0.5px]", containerClassName)}>
      <button
        type="button"
        data-key={keyCode}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
        style={{ touchAction: "manipulation" }}
        className={cn(
          "flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3.5px] bg-gray-100 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,1)_inset] transition-transform duration-75 select-none active:scale-[0.98]",
          isPressed &&
            "scale-[0.98] bg-gray-100/80 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,0.5)]",
          className,
        )}
      >
        <div className="flex h-full w-full flex-col items-start justify-between p-1 text-[5px] text-neutral-700">
          {children}
        </div>
      </button>
    </div>
  );
};

const OptionKey = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25"
      />
    </svg>
  );
};
