"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";

const navItems = [
  { id: "dashboard", label: "Asosiy", icon: "🏠", to: "/sportsman/dashboard" },
  {
    id: "sport-turlari",
    label: "Sport turlari",
    icon: "🎯",
    to: "/sportsman/sport-turlari",
  },
  {
    id: "sport-joylari",
    label: "Sport joylari",
    icon: "📍",
    to: "/sportsman/sport-joylari",
  },
  {
    id: "musobaqalar",
    label: "Musobaqalar",
    icon: "📅",
    to: "/sportsman/musobaqalar",
  },
  { id: "klublar", label: "Klublar", icon: "⚽", to: "/sportsman/klublar" },
  {
    id: "sportchilar",
    label: "Sportchilar",
    icon: "🤾‍♂️",
    to: "/sportsman/sportchilar",
  },
  { id: "yutuqlar", label: "Yutuqlar", icon: "🏅", to: "/sportsman/yutuqlar" },
  {
    id: "yangiliklar",
    label: "Yangiliklar",
    icon: "📰",
    to: "/sportsman/yangiliklar",
  },
];

export function Sidebar() {
  const { currentPage, setCurrentPage, isAuthenticated, currentUser, logout } =
    useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const SidebarContent = () => (
    <div className={cn(
      "h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo and Collapse Toggle */}
      <div className={cn(
        "border-b border-slate-200 dark:border-slate-800 flex items-center justify-between",
        collapsed ? "p-4 justify-center" : "p-6"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="text-4xl">🏆</div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white whitespace-nowrap">
                UniSport
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Sport Platformasi
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="shrink-0"
        >
          {collapsed ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </Button>
      </div>

      {/* User Profile Section */}
      {isAuthenticated && currentUser ? (
        <Link
          href={"/sportsman/profil"}
          onClick={() => handleNavClick("profil")}
          className={cn(
            "mx-4 mt-4 p-3 rounded-xl flex items-center gap-3 transition-all",
            collapsed ? "justify-center" : "",
            currentPage === "profil"
              ? "bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
              : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
          )}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
            {currentUser.avatar_emoji}
          </div>
          {!collapsed && (
            <div className="text-left flex-1 min-w-0">
              <p
                className={cn(
                  "font-semibold text-sm truncate",
                  currentPage === "profil"
                    ? "text-white"
                    : "text-slate-800 dark:text-white",
                )}
              >
                {currentUser.ism} {currentUser.familiya}
              </p>
              <p
                className={cn(
                  "text-xs truncate",
                  currentPage === "profil" ? "text-white/80" : "text-slate-500",
                )}
              >
                Profilni ko'rish
              </p>
            </div>
          )}
        </Link>
      ) : (
        <Link
          href={"/auth"}
          onClick={() => handleNavClick("auth")}
          className={cn(
            "mx-4 mt-4 p-3 rounded-xl flex items-center gap-3 transition-all",
            collapsed ? "justify-center" : "",
            currentPage === "auth"
              ? "bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
              : "bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
          )}
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-xl shrink-0">
            👤
          </div>
          {!collapsed && (
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
          )}
        </Link>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            type="button"
            href={item.to}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
              collapsed ? "justify-center" : "w-full",
              currentPage === item.id
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
            )}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className={cn(
        "p-4 border-t border-slate-200 dark:border-slate-800 space-y-2",
        collapsed ? "flex flex-col items-center" : ""
      )}>
        {/* Admin Panel Link */}
        {isAuthenticated && currentUser?.isAdmin && (
          <Link
            href="/admin/coaches-manager"
            onClick={() => handleNavClick("coaches-manager")}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
              collapsed ? "justify-center w-full" : "w-full",
              currentPage === "coaches-manager"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                : "text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20",
            )}
            title={collapsed ? "Coachlar" : undefined}
          >
            <span className="text-xl shrink-0">📋</span>
            {!collapsed && <span>Coachlar</span>}
          </Link>
        )}

        <div className={cn("flex gap-2", collapsed ? "flex-col w-full" : "")}>
          <ThemeToggle />

          {isAuthenticated && (
            <Button
              variant="destructive"
              className={cn(
                "justify-center gap-2",
                collapsed ? "w-full" : "flex-1"
              )}
              onClick={handleLogout}
            >
              <span>🚪</span>
              {!collapsed && <span>Chiqish</span>}
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:block h-screen fixed left-0 top-0 z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}>
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
