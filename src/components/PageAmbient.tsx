import { memo } from "react";
import { useReducedMotion } from "framer-motion";
import { Spotlight as SpotlightSvg } from "@/components/ui/spotlight";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import { Meteors } from "@/components/ui/meteors";
import { useTheme } from "@/hooks/use-theme";

function PageAmbientInner() {
  const prefersReducedMotion = useReducedMotion();
  const { resolved } = useTheme();
  const isDark = resolved === "dark";

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bokeh-bg opacity-30" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isDark ? 0.4 : 0.22 }}
      >
        <div className="absolute inset-0 bokeh-bg" />
      </div>

      <div className="absolute inset-0 hidden md:block">
        <SpotlightNew
          gradientFirst={
            isDark
              ? "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(173, 80%, 55%, .12) 0, hsla(173, 80%, 40%, .04) 50%, transparent 80%)"
              : "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(173, 80%, 45%, .18) 0, hsla(173, 60%, 50%, .06) 50%, transparent 80%)"
          }
          duration={9}
          translateY={-280}
        />
      </div>

      <div className="absolute left-0 top-0 h-[40rem] w-full overflow-hidden md:h-[50rem]">
        <SpotlightSvg
          className="-top-24 left-0 md:-top-20 md:left-8"
          fill={isDark ? "hsl(173, 80%, 50%)" : "hsl(173, 70%, 42%)"}
        />
      </div>

      {isDark && (
        <div className="absolute inset-0 opacity-40">
          <Meteors number={12} />
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-accent opacity-[0.07] blur-3xl dark:opacity-[0.05]"
          aria-hidden
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-gold opacity-[0.06] blur-3xl dark:opacity-[0.04]"
          aria-hidden
        />
      </div>
    </div>
  );
}

export const PageAmbient = memo(PageAmbientInner);
