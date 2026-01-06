"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { AnimatedCursor } from "@/components/animations/AnimatedCursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AnimatedCursor />
      {children}
    </ThemeProvider>
  );
}
