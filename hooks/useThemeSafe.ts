"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Safe hook to get theme that prevents hydration mismatches
 * Returns the theme only after client-side hydration
 */
export function useThemeSafe() {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    isDark: mounted && resolvedTheme === "dark",
    isLight: mounted && resolvedTheme === "light",
    theme: mounted ? resolvedTheme : null,
    systemTheme: theme,
    mounted,
  };
}