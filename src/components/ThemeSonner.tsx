import { Toaster as Sonner } from "@/components/ui/sonner";
import { useTheme } from "@/hooks/use-theme";

export function ThemeSonner() {
  const { resolved } = useTheme();
  return <Sonner theme={resolved} />;
}
