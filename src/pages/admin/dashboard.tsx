"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/lib/store";

export default function AdminDashboard() {
  const {
    sportchilar,
    klublar,
    musobaqalar,
    sportJoylari,
    yangiliklar,
    yutuqlar,
    users,
  } = useApp();

  const stats = [
    {
      label: "Sportchilar",
      value: sportchilar.length,
      icon: "🤾‍♂️",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Klublar",
      value: klublar.length,
      icon: "⚽",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Musobaqalar",
      value: musobaqalar.length,
      icon: "📅",
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Sport joylari",
      value: sportJoylari.length,
      icon: "📍",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Yangiliklar",
      value: yangiliklar.length,
      icon: "📰",
      color: "from-pink-500 to-pink-600",
    },
    {
      label: "Yutuqlar",
      value: yutuqlar.length,
      icon: "🏅",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      label: "Foydalanuvchilar",
      value: users.length,
      icon: "👥",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      label: "Adminlar",
      value: users.filter((u) => u.isAdmin).length,
      icon: "🔐",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="overflow-hidden">
          <div className={`h-1 bg-linear-to-r ${stat.color}`} />
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
