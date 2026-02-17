"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/lib/store";

export default function YangiliklarPage() {
  const { yangiliklar } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        Yangiliklar
      </h1>

      <div className="space-y-6">
        {yangiliklar.map((yangilik) => (
          <Card
            key={yangilik.id}
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
            <CardContent className="p-6">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {yangilik.rasm_emoji}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {yangilik.sarlavha}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-3">
                {yangilik.mazmun}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                    {yangilik.kategoriya}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    📅 {yangilik.sana}
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-sm text-red-500">
                    ❤️ {yangilik.layklar}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                    💬 {yangilik.izohlar_soni}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {yangiliklar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📰</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday yangilik topilmadi
          </p>
        </div>
      )}
    </div>
  );
}
