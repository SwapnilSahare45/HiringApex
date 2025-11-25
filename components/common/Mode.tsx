"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  const current = theme === "system" ? systemTheme : theme;

  const isDark = current === "dark";

  return (
    <Button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      variant="outline"
      size="icon"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
