"use client";

import { Trophy, Medal, Users, Target } from "lucide-react";
import { useApp } from "@/lib/store";

interface StatsProps {
  variant?: "default" | "compact";
}

export function Stats({ variant = "default" }: StatsProps) {
  const { musobaqalar, yutuqlar, sportchilar, klublar } = useApp();
  const stats = [
    {
      icon: Trophy,
      value: musobaqalar.length,
      label: "Musobaqalar",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Medal,
      value: yutuqlar.length,
      label: "Yutuqlar",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Users,
      value: sportchilar.length,
      label: "Sportchilar",
      color: "from-sky-500 to-blue-600",
    },
    {
      icon: Target,
      value: klublar.length,
      label: "Klublar",
      color: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <div className={`stats-grid ${variant === "compact" ? "stats-compact" : ""}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="stats-card">
          <div className={`stats-icon-wrapper bg-linear-to-br ${stat.color}`}>
            <stat.icon className="stats-icon" />
          </div>
          <div className="stats-info">
            <span className="stats-value">{stat.value}</span>
            <span className="stats-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
