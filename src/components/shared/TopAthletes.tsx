"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { Sportchi } from "@/lib/types";

interface TopAthletesProps {
  sportchilar: Sportchi[];
}

export function TopAthletes({ sportchilar }: TopAthletesProps) {
  const topSportchilar = [...sportchilar]
    .sort((a, b) => b.medallar - a.medallar)
    .slice(0, 10);

  if (topSportchilar.length === 0) return null;

  return (
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
  );
}
