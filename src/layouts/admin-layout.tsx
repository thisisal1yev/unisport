"use client";

import { BaseSidebar, type NavItem } from "./base-sidebar";

const navItems: NavItem[] = [
  { id: "admin-dashboard", label: "Dashboard", icon: "📊", to: "/admin/dashboard" },
  { id: "sportchilar-manager", label: "Sportchilar", icon: "🤾‍♂️", to: "/admin/sportchilar-manager" },
  { id: "klublar-manager", label: "Klublar", icon: "⚽", to: "/admin/klublar-manager" },
  { id: "musobaqalar-manager", label: "Musobaqalar", icon: "📅", to: "/admin/musobaqalar-manager" },
  { id: "sport-joylari-manager", label: "Sport joylari", icon: "📍", to: "/admin/sport-joylari-manager" },
  { id: "yangiliklar", label: "Yangiliklar", icon: "📰", to: "/admin/yangiliklar" },
  { id: "yutuqlar", label: "Yutuqlar", icon: "🏆", to: "/admin/yutuqlar" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <BaseSidebar
        navItems={navItems}
        profileHref="/sportsman/profil"
        subtitle="Admin Panel"
        accentGradient="from-red-500 to-rose-600"
      />
      <div className="md:ml-64 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
