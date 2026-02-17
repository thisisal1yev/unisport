"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/lib/store";
import { getMedalEmoji } from "@/lib/utils";

export default function YutuqlarPage() {
  const { sportchilar, yutuqlar } = useApp();

  const topSportchilar = [...sportchilar]
    .sort((a, b) => b.medallar - a.medallar)
    .slice(0, 10);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        Yutuqlar
      </h1>

      {/* Top 10 Athletes */}
      {topSportchilar.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">🏆 Top 10 Sportchilar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topSportchilar.map((s, i) => {
                const bgColor =
                  i === 0
                    ? "bg-yellow-300 text-slate-800"
                    : i === 1
                      ? "bg-gray-300 text-slate-800"
                      : i === 2
                        ? "bg-orange-300 text-slate-800"
                        : "bg-white/90 text-slate-800";
                return (
                  <div
                    key={s.id}
                    className={`${bgColor} rounded-lg p-4 flex items-center gap-4`}
                  >
                    <div className="text-3xl font-bold">{i + 1}</div>
                    <div className="text-3xl">{s.avatar_emoji}</div>
                    <div className="flex-1">
                      <h4 className="font-bold">{s.ism}</h4>
                      <p className="text-sm opacity-80">
                        {s.sport} | {s.fakultet}
                      </p>
                      <p className="text-sm">
                        🏅 {s.medallar} medal | {"⭐".repeat(s.yulduzlar)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {yutuqlar.map((yutuq) => (
          <Card
            key={yutuq.id}
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
            <CardContent className="p-6">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {getMedalEmoji(yutuq.medal_turi)}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {yutuq.nomi}
              </h3>
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <p>👤 {yutuq.sportchi.ism}</p>
                <p>🏆 {yutuq.musobaqa}</p>
                <p>
                  🥇 {yutuq.medal_soni}x {yutuq.medal_turi}
                </p>
                <p className="text-slate-500">📅 {yutuq.sana}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {yutuqlar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏅</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday yutuq topilmadi
          </p>
        </div>
      )}
    </div>
  );
}
