"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YandexMap } from "@/components/ui/yandex-map";
import { tumanlar } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { useState } from "react";

export default function SportJoylariPage() {
  const { sportTurlari, sportJoylari } = useApp();

  const [filterSport, setFilterSport] = useState("all");
  const [filterTuman, setFilterTuman] = useState("all");
  const [selectedJoyId, setSelectedJoyId] = useState<number | null>(null);

  const filteredJoylar = sportJoylari.filter((joy) => {
    const matchesSport =
      filterSport === "all" || joy.sport_turlari.includes(filterSport);
    const matchesTuman = filterTuman === "all" || joy.tuman === filterTuman;
    return matchesSport && matchesTuman;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        Sport joylari
      </h1>

      {/* Filters */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Filtrlar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={filterSport} onValueChange={setFilterSport}>
              <SelectTrigger>
                <SelectValue placeholder="Barcha sport turlari" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha sport turlari</SelectItem>
                {sportTurlari.map((sport) => (
                  <SelectItem key={sport.id} value={sport.nomi}>
                    {sport.nomi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterTuman} onValueChange={setFilterTuman}>
              <SelectTrigger>
                <SelectValue placeholder="Barcha tumanlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha tumanlar</SelectItem>
                {tumanlar.map((tuman) => (
                  <SelectItem key={tuman} value={tuman}>
                    {tuman}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setFilterSport("all");
                setFilterTuman("all");
              }}
            >
              Tozalash
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Yandex Map */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Xarita
          </h3>
          <YandexMap
            locations={filteredJoylar}
            selectedLocationId={selectedJoyId}
            onLocationSelect={(loc) => setSelectedJoyId(loc.id)}
          />
        </CardContent>
      </Card>

      {/* Locations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJoylar.map((joy) => (
          <Card
            key={joy.id}
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                {joy.nomi}
              </h3>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <p>📍 {joy.manzil}</p>
                <p>🏘️ {joy.tuman} tumani</p>
                <p>📞 {joy.telefon || "Ma'lumot yo'q"}</p>
                <p>⏰ {joy.ish_vaqti || "Ma'lumot yo'q"}</p>
                <p>⭐ {joy.reyting}/5.0</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {joy.sport_turlari.map((sport) => (
                  <span
                    key={sport}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJoylar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📍</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday sport joyi topilmadi
          </p>
        </div>
      )}
    </div>
  );
}
