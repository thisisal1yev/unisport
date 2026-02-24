"use client";

import { BaseSidebar, type NavItem } from "./base-sidebar";

const navItems: NavItem[] = [
  { id: "dashboard", label: "Asosiy", icon: "🏠", to: "/sportsman/dashboard" },
  { id: "sport-turlari", label: "Sport turlari", icon: "🎯", to: "/sportsman/sport-turlari" },
  { id: "sport-joylari", label: "Sport joylari", icon: "📍", to: "/sportsman/sport-joylari" },
  { id: "musobaqalar", label: "Musobaqalar", icon: "📅", to: "/sportsman/musobaqalar" },
  { id: "klublar", label: "Klublar", icon: "⚽", to: "/sportsman/klublar" },
  { id: "sportchilar", label: "Sportchilar", icon: "🤾‍♂️", to: "/sportsman/sportchilar" },
  { id: "yutuqlar", label: "Yutuqlar", icon: "🏅", to: "/sportsman/yutuqlar" },
  { id: "yangiliklar", label: "Yangiliklar", icon: "📰", to: "/sportsman/yangiliklar" },
];

export function SportsmanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <BaseSidebar
        navItems={navItems}
        profileHref="/sportsman/profil"
        accentGradient="from-blue-500 to-indigo-600"
      />
      <div className="md:ml-64 p-4 md:p-8 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
