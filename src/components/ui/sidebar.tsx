"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
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
  const { currentPage, setCurrentPage, isAuthenticated, currentUser, logout } =
    useApp();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
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

      {/* User Profile Section */}
      {isAuthenticated && currentUser ? (
        <button
          type="button"
          onClick={() => handleNavClick("profil")}
          className={cn(
            "mx-4 mt-4 p-3 rounded-xl flex items-center gap-3 transition-all",
            currentPage === "profil"
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
              : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
          )}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
            {currentUser.avatar_emoji}
          </div>
          <div className="text-left flex-1">
            <p
              className={cn(
                "font-semibold text-sm",
                currentPage === "profil"
                  ? "text-white"
                  : "text-slate-800 dark:text-white",
              )}
            >
              {currentUser.ism} {currentUser.familiya}
            </p>
            <p
              className={cn(
                "text-xs",
                currentPage === "profil" ? "text-white/80" : "text-slate-500",
              )}
            >
              Profilni ko'rish
            </p>
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => handleNavClick("auth")}
          className={cn(
            "mx-4 mt-4 p-3 rounded-xl flex items-center gap-3 transition-all",
            currentPage === "auth"
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
              : "bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
          )}
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-xl">
            👤
          </div>
          <div className="text-left flex-1">
            <p
              className={cn(
                "font-semibold text-sm",
                currentPage === "auth"
                  ? "text-white"
                  : "text-emerald-700 dark:text-emerald-300",
              )}
            >
              Kirish / Ro'yxatdan o'tish
            </p>
            <p
              className={cn(
                "text-xs",
                currentPage === "auth"
                  ? "text-white/80"
                  : "text-emerald-600/70 dark:text-emerald-400/70",
              )}
            >
              Musobaqalarda qatnashing
            </p>
          </div>
        </button>
      )}

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
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
            )}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {/* Admin Panel Link */}
        {isAuthenticated && currentUser?.isAdmin && (
          <button
            type="button"
            onClick={() => handleNavClick("admin")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
              currentPage === "admin"
                ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25"
                : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
            )}
          >
            <span className="text-xl">🔧</span>
            <span>Admin Panel</span>
          </button>
        )}
        <Button
          variant="outline"
          className="w-full justify-center gap-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span>{theme === "dark" ? "☀️" : "🌙"}</span>
          <span>{theme === "dark" ? "Yorug' tema" : "Qora tema"}</span>
        </Button>
        {isAuthenticated && (
          <Button
            variant="destructive"
            className="w-full justify-center gap-2"
            onClick={handleLogout}
          >
            <span>🚪</span>
            <span>Chiqish</span>
          </Button>
        )}
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
