import React, { createContext, useContext, useEffect, useState } from "react";
import { destroyLenis, initLenis } from "@/lib/scroll/lenis";

interface ScrollContextValue {
  ready: boolean;
}

const ScrollContext = createContext<ScrollContextValue>({ ready: false });

export function ScrollProvider({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setReady(true);
      return;
    }

    initLenis();
    setReady(true);

    return () => {
      destroyLenis();
    };
  }, [enabled]);

  return (
    <ScrollContext.Provider value={{ ready }}>{children}</ScrollContext.Provider>
  );
}

export function useScrollReady() {
  return useContext(ScrollContext).ready;
}
