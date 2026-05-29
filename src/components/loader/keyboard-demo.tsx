import React from "react";
import { Keyboard } from "@/components/ui/keyboard";

interface KeyboardDemoProps {
  enableSound?: boolean;
  onEnter?: () => void;
  alwaysListen?: boolean;
  showIdleHint?: boolean;
}

/** Aceternity keyboard-demo layout — centered MacBook keyboard with keystroke preview. */
export function KeyboardDemo({
  enableSound = true,
  onEnter,
  alwaysListen = false,
  showIdleHint = true,
}: KeyboardDemoProps) {
  return (
    <div className="flex min-h-[14rem] w-full items-center justify-center py-4 sm:min-h-[22rem] sm:py-8 md:min-h-[30rem] md:py-10">
      <Keyboard
        enableSound={enableSound}
        showPreview
        onEnter={onEnter}
        alwaysListen={alwaysListen}
        idlePreviewLabel={showIdleHint ? "return" : undefined}
      />
    </div>
  );
}
