"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fakultetlar, guruhlar } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import type { Sportchi } from "@/lib/types";
import { getMedalEmoji } from "@/lib/utils";
import { useState } from "react";

export default function SportchilarPage() {
  const { sportTurlari, sportchilar, yutuqlar } = useApp();

  const [filterSport, setFilterSport] = useState("all");
  const [filterFakultet, setFilterFakultet] = useState("all");
  const [filterGuruh, setFilterGuruh] = useState("all");
  const [filterDaraja, setFilterDaraja] = useState("all");
  const [selectedSportchi, setSelectedSportchi] = useState<Sportchi | null>(
    null,
  );

  const filteredSportchilar = sportchilar.filter((s) => {
    const matchesSport = filterSport === "all" || s.sport === filterSport;
    const matchesFakultet =
      filterFakultet === "all" || s.fakultet === filterFakultet;
    const matchesGuruh = filterGuruh === "all" || s.guruh === filterGuruh;
    const matchesDaraja = filterDaraja === "all" || s.daraja === filterDaraja;
    return matchesSport && matchesFakultet && matchesGuruh && matchesDaraja;
  });

  const getSportchiYutuqlar = (sportchiId: number) => {
    return yutuqlar.filter((y) => y.sportchi.id === sportchiId);
  };

  const resetFilters = () => {
    setFilterSport("all");
    setFilterFakultet("all");
    setFilterGuruh("all");
    setFilterDaraja("all");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        Sportchilar
      </h1>

      {/* Filters */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Filtrlar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={filterSport} onValueChange={setFilterSport}>
              <SelectTrigger>
                <SelectValue placeholder="Barcha sport turlari" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha sport turlari</SelectItem>
                {sportTurlari.map((sport) => (
                  <SelectItem key={sport.id} value={sport.nomi}>
                    {sport.rasm_emoji} {sport.nomi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterFakultet} onValueChange={setFilterFakultet}>
              <SelectTrigger>
                <SelectValue placeholder="Barcha fakultetlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha fakultetlar</SelectItem>
                {fakultetlar.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterGuruh} onValueChange={setFilterGuruh}>
              <SelectTrigger>
                <SelectValue placeholder="Barcha guruhlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha guruhlar</SelectItem>
                {guruhlar.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterDaraja} onValueChange={setFilterDaraja}>
              <SelectTrigger>
                <SelectValue placeholder="Barcha darajalar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha darajalar</SelectItem>
                <SelectItem value="Boshlovchi">Boshlovchi</SelectItem>
                <SelectItem value="Havaskor">Havaskor</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="mt-4" onClick={resetFilters}>
            Filtrlarni tozalash
          </Button>
        </CardContent>
      </Card>

      {/* Athletes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredSportchilar.map((sportchi) => (
          <Card
            key={sportchi.id}
            className="group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
            onClick={() => setSelectedSportchi(sportchi)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {sportchi.avatar_emoji}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {sportchi.ism}
              </h3>
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <p>🎯 {sportchi.sport}</p>
                <p>🏫 {sportchi.fakultet || "Fakultet ko'rsatilmagan"}</p>
                <p>👥 {sportchi.guruh || "Guruh ko'rsatilmagan"}</p>
              </div>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-2">
                {sportchi.daraja}
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <span className="text-sm">🏅 {sportchi.medallar}</span>
                <span className="text-sm">
                  {"⭐".repeat(sportchi.yulduzlar)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSportchilar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤾‍♂️</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday sportchi topilmadi
          </p>
        </div>
      )}

      {/* Profile Modal */}
      <Dialog
        open={!!selectedSportchi}
        onOpenChange={() => setSelectedSportchi(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSportchi && (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">Sportchi profili</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Avatar & Stats */}
                <div className="text-center">
                  <div className="text-9xl mb-4">
                    {selectedSportchi.avatar_emoji}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                    {selectedSportchi.ism}
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                    {selectedSportchi.sport}
                  </p>
                  <div className="flex justify-center gap-2 mb-4">
                    <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                      {selectedSportchi.daraja}
                    </span>
                  </div>
                  <div className="text-4xl mb-2">
                    {"⭐".repeat(selectedSportchi.yulduzlar)}
                  </div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">
                    🏅 {selectedSportchi.medallar} medal
                  </p>
                </div>

                {/* Right Column - Details */}
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                    Ma'lumotlar
                  </h3>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300">
                    <p>
                      <span className="font-semibold">Fakultet:</span>{" "}
                      {selectedSportchi.fakultet || "Ko'rsatilmagan"}
                    </p>
                    <p>
                      <span className="font-semibold">Guruh:</span>{" "}
                      {selectedSportchi.guruh || "Ko'rsatilmagan"}
                    </p>
                    <p>
                      <span className="font-semibold">Klub:</span>{" "}
                      {selectedSportchi.klub || "Klubda emas"}
                    </p>
                    <p>
                      <span className="font-semibold">Telefon:</span>{" "}
                      {selectedSportchi.telefon || "Ko'rsatilmagan"}
                    </p>
                    <p>
                      <span className="font-semibold">Tug'ilgan yil:</span>{" "}
                      {selectedSportchi.tug_yil || "Ko'rsatilmagan"}
                    </p>
                    <p>
                      <span className="font-semibold">Bio:</span>{" "}
                      {selectedSportchi.bio || "Bio mavjud emas"}
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-8 mb-4">
                    Yutuqlar ({getSportchiYutuqlar(selectedSportchi.id).length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getSportchiYutuqlar(selectedSportchi.id).length > 0 ? (
                      getSportchiYutuqlar(selectedSportchi.id).map((yutuq) => (
                        <div
                          key={yutuq.id}
                          className="border border-slate-200 dark:border-slate-700 rounded-xl p-4"
                        >
                          <div className="text-3xl mb-2">
                            {getMedalEmoji(yutuq.medal_turi)}
                          </div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {yutuq.nomi}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {yutuq.musobaqa}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            📅 {yutuq.sana}
                          </p>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">
                            {yutuq.medal_soni}x {yutuq.medal_turi}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 dark:text-slate-400 col-span-2">
                        Hozircha yutuqlar yo'q
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSportchi(null)}
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
