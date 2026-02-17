"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const t = resolvedTheme;

  return (
    <Button
      variant="outline"
      className="w-full justify-center gap-2"
      onClick={() => setTheme(t === "dark" ? "light" : "dark")}
    >
      <span>{t === "dark" ? "☀️" : "🌙"}</span>
      <span>{t === "dark" ? "Yorug' tema" : "Qora tema"}</span>
    </Button>
  );
}