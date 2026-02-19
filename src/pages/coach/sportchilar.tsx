"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fakultetlar } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import type { Sportchi } from "@/lib/types";
import { getMedalEmoji } from "@/lib/utils";
import { useState } from "react";

export default function CoachSportchilar() {
  const {
    sportTurlari,
    sportchilar,
    klublar,
    yutuqlar,
    addSportchi,
    updateSportchi,
    deleteSportchi,
    guruhlar,
  } = useApp();

  const [filterSport, setFilterSport] = useState("all");
  const [filterFakultet, setFilterFakultet] = useState("all");
  const [filterGuruh, setFilterGuruh] = useState("all");
  const [filterDaraja, setFilterDaraja] = useState("all");
  const [selectedSportchi, setSelectedSportchi] = useState<Sportchi | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSportchi, setEditingSportchi] = useState<Sportchi | null>(null);
  const [formData, setFormData] = useState({
    ism: "",
    sport: "",
    fakultet: "",
    guruh: "",
    daraja: "Havaskor" as "Boshlovchi" | "Havaskor" | "Professional",
    medallar: 0,
    yulduzlar: 3,
    avatar_emoji: "🧑",
    telefon: "",
    tug_yil: 2000,
    bio: "",
    klub: "",
    klub_id: undefined as number | undefined,
  });

  const filteredSportchilar = sportchilar.filter((s) => {
    const matchesSport = filterSport === "all" || s.sport === filterSport;
    const matchesFakultet = filterFakultet === "all" || s.fakultet === filterFakultet;
    const matchesGuruh = filterGuruh === "all" || s.guruh === filterGuruh;
    const matchesDaraja = filterDaraja === "all" || s.daraja === filterDaraja;
    return matchesSport && matchesFakultet && matchesGuruh && matchesDaraja;
  });

  const resetForm = () => {
    setFormData({
      ism: "",
      sport: "",
      fakultet: "",
      guruh: "",
      daraja: "Havaskor",
      medallar: 0,
      yulduzlar: 3,
      avatar_emoji: "🧑",
      telefon: "",
      tug_yil: 2000,
      bio: "",
      klub: "",
      klub_id: undefined,
    });
    setEditingSportchi(null);
  };

  const openEditDialog = (sportchi: Sportchi) => {
    setEditingSportchi(sportchi);
    setFormData({
      ism: sportchi.ism,
      sport: sportchi.sport,
      fakultet: sportchi.fakultet || "",
      guruh: sportchi.guruh || "",
      daraja: sportchi.daraja,
      medallar: sportchi.medallar,
      yulduzlar: sportchi.yulduzlar,
      avatar_emoji: sportchi.avatar_emoji,
      telefon: sportchi.telefon || "",
      tug_yil: sportchi.tug_yil || 2000,
      bio: sportchi.bio || "",
      klub: sportchi.klub || "",
      klub_id: sportchi.klub_id,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingSportchi) {
      updateSportchi(editingSportchi.id, formData);
    } else {
      addSportchi(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      deleteSportchi(id);
    }
  };

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Sportchilar
        </h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSportchi
                  ? "Sportchini tahrirlash"
                  : "Yangi sportchi qo'shish"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Ism familiya"
                value={formData.ism}
                onChange={(e) =>
                  setFormData({ ...formData, ism: e.target.value })
                }
              />
              <Select
                value={formData.sport}
                onValueChange={(v) => setFormData({ ...formData, sport: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sport turi" />
                </SelectTrigger>
                <SelectContent>
                  {sportTurlari.map((s) => (
                    <SelectItem key={s.id} value={s.nomi}>
                      {s.rasm_emoji} {s.nomi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Fakultet"
                  value={formData.fakultet}
                  onChange={(e) =>
                    setFormData({ ...formData, fakultet: e.target.value })
                  }
                />
                <Input
                  placeholder="Guruh"
                  value={formData.guruh}
                  onChange={(e) =>
                    setFormData({ ...formData, guruh: e.target.value })
                  }
                />
              </div>
              <Select
                value={formData.daraja}
                onValueChange={(
                  v: "Boshlovchi" | "Havaskor" | "Professional",
                ) => setFormData({ ...formData, daraja: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Daraja" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boshlovchi">Boshlovchi</SelectItem>
                  <SelectItem value="Havaskor">Havaskor</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Medallar"
                  value={formData.medallar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      medallar: Number(e.target.value),
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Tug'ilgan yil"
                  value={formData.tug_yil}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tug_yil: Number(e.target.value),
                    })
                  }
                />
              </div>
              <Input
                placeholder="Telefon"
                value={formData.telefon}
                onChange={(e) =>
                  setFormData({ ...formData, telefon: e.target.value })
                }
              />
              <Select
                value={formData.klub_id?.toString() || ""}
                onValueChange={(v) => {
                  const klub = klublar.find((k) => k.id === Number(v));
                  setFormData({
                    ...formData,
                    klub_id: Number(v),
                    klub: klub?.nomi || "",
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Klub (ixtiyoriy)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Klub yo'q</SelectItem>
                  {klublar.map((k) => (
                    <SelectItem key={k.id} value={k.id.toString()}>
                      {k.rasm_emoji} {k.nomi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {editingSportchi ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
            <CardContent className="p-6 text-center">
              <div
                className="cursor-pointer"
                onClick={() => setSelectedSportchi(sportchi)}
              >
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
