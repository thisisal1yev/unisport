"use client";

import { BaseSidebar, type NavItem } from "./base-sidebar";

const navItems: NavItem[] = [
  { id: "dashboard", label: "Asosiy", icon: "🏠", to: "/coach/dashboard" },
  { id: "sportchilar", label: "Sportchilar", icon: "🤾‍♂️", to: "/coach/sportchilar" },
  { id: "klublar", label: "Klublar", icon: "⚽", to: "/coach/klublar" },
  { id: "musobaqalar", label: "Musobaqalar", icon: "📅", to: "/coach/musobaqalar" },
  { id: "sport-joylari", label: "Sport joylari", icon: "📍", to: "/coach/sport-joylari" },
];

export function CoachLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <BaseSidebar
        navItems={navItems}
        profileHref="/coach/profil"
        subtitle="Murabbiy Panel"
        accentGradient="from-emerald-500 to-teal-600"
      />
      <div className="md:ml-64 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
