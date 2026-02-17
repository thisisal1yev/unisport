"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApp } from "@/lib/store";
import type { SportType } from "@/lib/types";
import { useMemo, useState } from "react";

export default function SportTurlariPage() {
  const { sportTurlari, musobaqalar, sportchilar } = useApp();
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);

  const sportMusobaqalar = useMemo(() => {
    if (!selectedSport) return [];
    return musobaqalar.filter((m) => m.kategoriya === selectedSport.nomi);
  }, [musobaqalar, selectedSport]);

  const sportSportchilar = useMemo(() => {
    if (!selectedSport) return [];
    return sportchilar.filter((s) => s.sport === selectedSport.nomi);
  }, [sportchilar, selectedSport]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        Sport turlari
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {sportTurlari.map((sport) => (
          <Card
            key={sport.id}
            className="group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800 overflow-hidden"
            onClick={() => setSelectedSport(sport)}
          >
            {sport.rasm ? (
              <div className="relative h-44 overflow-hidden">
                <img
                  src={sport.rasm}
                  alt={sport.nomi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg font-bold text-white">{sport.nomi}</h3>
                </div>
              </div>
            ) : (
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {sport.rasm_emoji}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {sport.nomi}
                </h3>
              </CardContent>
            )}
            <CardContent className={sport.rasm ? "p-4" : "px-6 pb-6 pt-0"}>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {sport.tavsif}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sport Detail Modal */}
      <Dialog
        open={!!selectedSport}
        onOpenChange={() => setSelectedSport(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSport && (
            <>
              <DialogHeader>
                <div className="text-center">
                  {selectedSport.rasm ? (
                    <div className="relative h-56 md:h-72 rounded-xl overflow-hidden mb-4">
                      <img
                        src={selectedSport.rasm}
                        alt={selectedSport.nomi}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-0 right-0">
                        <DialogTitle className="text-3xl text-white">
                          {selectedSport.nomi}
                        </DialogTitle>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-8xl mb-4">
                        {selectedSport.rasm_emoji}
                      </div>
                      <DialogTitle className="text-3xl">
                        {selectedSport.nomi}
                      </DialogTitle>
                    </>
                  )}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    Tavsif
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedSport.tavsif}
                  </p>
                </div>

                {/* Info Grid */}
                {(selectedSport.asos_solingan ||
                  selectedSport.jamoa_hajmi ||
                  selectedSport.maydon_olchami) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedSport.asos_solingan && (
                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                          Asos solingan
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          {selectedSport.asos_solingan}
                        </p>
                      </div>
                    )}
                    {selectedSport.jamoa_hajmi && (
                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                          Jamoa hajmi
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          {selectedSport.jamoa_hajmi}
                        </p>
                      </div>
                    )}
                    {selectedSport.maydon_olchami && (
                      <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">
                          Maydon o'lchami
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-400">
                          {selectedSport.maydon_olchami}
                        </p>
                      </div>
                    )}
                    {selectedSport.qoidalar && (
                      <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">
                          Qoidalar
                        </h4>
                        <p className="text-sm text-orange-700 dark:text-orange-400">
                          {selectedSport.qoidalar}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* History */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    Tarix
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedSport.tarix}
                  </p>
                </div>

                {/* Facts */}
                {selectedSport.faktlar && selectedSport.faktlar.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                      Qiziqarli faktlar
                    </h3>
                    <div className="space-y-2">
                      {selectedSport.faktlar.map((fakt, index) => (
                        <div
                          key={`${selectedSport.id}-fakt-${index}`}
                          className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                        >
                          <span className="text-amber-500 font-bold shrink-0">
                            {index + 1}.
                          </span>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {fakt}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                    Musobaqalar ({sportMusobaqalar.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sportMusobaqalar.length > 0 ? (
                      sportMusobaqalar.map((m) => (
                        <div
                          key={m.id}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-700"
                        >
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {m.nomi}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {m.sana}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {m.joy}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {m.ishtirokchilar_soni} ishtirokchi
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
                    Sportchilar ({sportSportchilar.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sportSportchilar.length > 0 ? (
                      sportSportchilar.map((s) => (
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
                            {s.medallar} medal | {"*".repeat(s.yulduzlar)}
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
                <Button
                  variant="outline"
                  onClick={() => setSelectedSport(null)}
                >
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
