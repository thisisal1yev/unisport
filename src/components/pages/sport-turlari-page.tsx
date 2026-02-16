"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { SportType } from "@/lib/types";

export function SportTurlariPage() {
  const { sportTurlari, musobaqalar, sportchilar } = useApp();
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);

  const getSportMusobaqalar = (sportNomi: string) => {
    return musobaqalar.filter((m) => m.kategoriya === sportNomi);
  };

  const getSportSportchilar = (sportNomi: string) => {
    return sportchilar.filter((s) => s.sport === sportNomi);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        Sport turlari
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {sportTurlari.map((sport) => (
          <Card
            key={sport.id}
            className="group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
            onClick={() => setSelectedSport(sport)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {sport.rasm_emoji}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {sport.nomi}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {sport.tavsif}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sport Detail Modal */}
      <Dialog open={!!selectedSport} onOpenChange={() => setSelectedSport(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSport && (
            <>
              <DialogHeader>
                <div className="text-center">
                  <div className="text-8xl mb-4">{selectedSport.rasm_emoji}</div>
                  <DialogTitle className="text-3xl">
                    {selectedSport.nomi}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    Tavsif
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedSport.tavsif}
                  </p>
                </div>

                {/* History */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    Tarix
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedSport.tarix}
                  </p>
                </div>

                {/* YouTube Video */}
                {selectedSport.youtube_havola && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      Video
                    </h3>
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <iframe
                        src={selectedSport.youtube_havola}
                        className="w-full h-full"
                        allowFullScreen
                        title={selectedSport.nomi}
                      />
                    </div>
                  </div>
                )}

                {/* Competitions */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    Musobaqalar ({getSportMusobaqalar(selectedSport.nomi).length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getSportMusobaqalar(selectedSport.nomi).length > 0 ? (
                      getSportMusobaqalar(selectedSport.nomi).map((m) => (
                        <div
                          key={m.id}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-700"
                        >
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {m.nomi}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            📅 {m.sana}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            📍 {m.joy}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            👥 {m.ishtirokchilar_soni} ishtirokchi
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 dark:text-slate-400 col-span-2">
                        Hozircha musobaqalar yo'q
                      </p>
                    )}
                  </div>
                </div>

                {/* Athletes */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    Sportchilar ({getSportSportchilar(selectedSport.nomi).length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getSportSportchilar(selectedSport.nomi).length > 0 ? (
                      getSportSportchilar(selectedSport.nomi).map((s) => (
                        <div
                          key={s.id}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center"
                        >
                          <div className="text-4xl mb-2">{s.avatar_emoji}</div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {s.ism}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {s.fakultet}
                          </p>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {s.daraja}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            🏅 {s.medallar} | {"⭐".repeat(s.yulduzlar)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 dark:text-slate-400 col-span-3">
                        Hozircha sportchilar yo'q
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={() => setSelectedSport(null)}>
                  Yopish
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
