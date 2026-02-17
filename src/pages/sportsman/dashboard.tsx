"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/lib/store";

export default function DashboardPage() {
  const { musobaqalar, yutuqlar, sportchilar, klublar, setCurrentPage } =
    useApp();

  const stats = [
    {
      icon: "🏆",
      value: musobaqalar.length,
      label: "Musobaqalar",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: "🏅",
      value: yutuqlar.length,
      label: "Yutuqlar",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: "🤾‍♂️",
      value: sportchilar.length,
      label: "Sportchilar",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: "⚽",
      value: klublar.length,
      label: "Klublar",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        Asosiy sahifa
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
            <CardContent className="p-6">
              <div
                className={`w-12 h-12 rounded-full bg-linear-to-r ${stat.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
              >
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              🎯 Sport turlari
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              12 xil sport turi bilan tanishing
            </p>
            <Button
              onClick={() => setCurrentPage("sport-turlari")}
              className="bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Ko'rish
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              📍 Qayerda mashq qilish mumkin?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Yaqinroqdagi sport joylarini toping
            </p>
            <Button
              onClick={() => setCurrentPage("sport-joylari")}
              className="bg-linear-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
            >
              Xaritadan ko'rish
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Competitions */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            📅 Kelgusi musobaqalar
          </h2>
          <div className="space-y-4">
            {musobaqalar
              .filter((m) => m.holat === "kelgusi")
              .slice(0, 3)
              .map((musobaqa) => (
                <div
                  key={musobaqa.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="text-4xl">{musobaqa.rasm_emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      {musobaqa.nomi}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      📅 {musobaqa.sana} • 📍 {musobaqa.joy}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {musobaqa.ishtirokchilar_soni}/
                      {musobaqa.maksimal_ishtirokchilar}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => setCurrentPage("/sportsman/musobaqalar")}
          >
            Barcha musobaqalar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
