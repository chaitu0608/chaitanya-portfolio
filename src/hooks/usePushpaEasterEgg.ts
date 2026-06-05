import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PUSHPA_FUNNY_URL,
  PUSHPA_PATH,
} from "@/components/log/PushpaEasterEgg";
import { useTypedSequence } from "@/hooks/useTypedSequence";

export function usePushpaEasterEgg() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const trigger = useCallback(() => {
    setOpen(true);
    if (!location.pathname.startsWith(PUSHPA_PATH)) {
      navigate(PUSHPA_FUNNY_URL, { replace: false });
    }
  }, [location.pathname, navigate]);

  const close = useCallback(() => {
    setOpen(false);
    if (location.pathname.startsWith(PUSHPA_PATH)) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname.startsWith(PUSHPA_PATH)) {
      setOpen(true);
    }
  }, [location.pathname]);

  useTypedSequence("bhais", trigger);

  return { open, trigger, close };
}
