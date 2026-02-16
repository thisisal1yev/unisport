"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { id: "dashboard", label: "Asosiy", icon: "🏠" },
  { id: "sport-turlari", label: "Sport turlari", icon: "🎯" },
  { id: "sport-joylari", label: "Sport joylari", icon: "📍" },
  { id: "musobaqalar", label: "Musobaqalar", icon: "📅" },
  { id: "klublar", label: "Klublar", icon: "⚽" },
  { id: "sportchilar", label: "Sportchilar", icon: "🤾‍♂️" },
  { id: "yutuqlar", label: "Yutuqlar", icon: "🏅" },
  { id: "yangiliklar", label: "Yangiliklar", icon: "📰" },
];

export function Sidebar() {
  const { currentPage, setCurrentPage } = useApp();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🏆</div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              UniSport
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sport Platformasi
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            type="button"
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
              currentPage === item.id
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-center gap-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span>{theme === "dark" ? "☀️" : "🌙"}</span>
          <span>{theme === "dark" ? "Yorug' tema" : "Qora tema"}</span>
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-center gap-2"
        >
          <span>🚪</span>
          <span>Chiqish</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen fixed left-0 top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
