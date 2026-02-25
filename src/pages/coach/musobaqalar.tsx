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
import { useApp } from "@/lib/store";
import type { Musobaqa } from "@/lib/types";
import { useState } from "react";

export default function CoachMusobaqalar() {
  const {
    sportTurlari,
    musobaqalar,
    sportchilar,
    sportJoylari,
    addMusobaqa,
    updateMusobaqa,
    deleteMusobaqa,
    currentUser,
    assignWinners,
    uploadNizomFile,
    deleteNizomFile,
  } = useApp();

  const [filterSport, setFilterSport] = useState("all");
  const [detailModal, setDetailModal] = useState<Musobaqa | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMusobaqa, setEditingMusobaqa] = useState<Musobaqa | null>(null);
  const [uploadingNizom, setUploadingNizom] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nomi: "",
    kategoriya: "",
    sana: "",
    joy: "",
    ishtirokchilar_soni: 0,
    maksimal_ishtirokchilar: 32,
    holat: "kelgusi" as "kelgusi" | "faol" | "yakunlangan",
    rasm_emoji: "🏆",
    tavsif: "",
    mukofotlar: "",
    nizom: null as File | null,
    nizomUrl: "",
  });

  const filteredMusobaqalar = musobaqalar.filter((m) => {
    return filterSport === "all" || m.kategoriya === filterSport;
  });

  const resetForm = () => {
    setFormData({
      nomi: "",
      kategoriya: "",
      sana: "",
      joy: "",
      ishtirokchilar_soni: 0,
      maksimal_ishtirokchilar: 32,
      holat: "kelgusi",
      rasm_emoji: "🏆",
      tavsif: "",
      mukofotlar: "",
      nizom: null,
      nizomUrl: "",
    });
    setEditingMusobaqa(null);
  };

  const openEditDialog = (m: Musobaqa) => {
    setEditingMusobaqa(m);
    setFormData({
      nomi: m.nomi,
      kategoriya: m.kategoriya,
      sana: m.sana,
      joy: m.joy,
      ishtirokchilar_soni: m.ishtirokchilar_soni,
      maksimal_ishtirokchilar: m.maksimal_ishtirokchilar,
      holat: m.holat,
      rasm_emoji: m.rasm_emoji,
      tavsif: m.tavsif || "",
      mukofotlar: m.mukofotlar || "",
      nizom: null,
      nizomUrl: m.nizomUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    let nizomUrl = formData.nizomUrl;
    
    // Upload new nizom file if selected
    if (formData.nizom) {
      setUploadingNizom(true);
      setUploadError(null);
      
      const result = await uploadNizomFile(formData.nizom, editingMusobaqa?.id);
      
      if (result.error) {
        setUploadError(result.error);
        setUploadingNizom(false);
        return; // Stop submission if upload fails
      }
      
      if (result.url) {
        nizomUrl = result.url;
        
        // Delete old nizom file if updating
        if (editingMusobaqa?.nizomUrl) {
          const oldFileName = editingMusobaqa.nizomUrl.split("/").pop() || "";
          if (oldFileName) {
            await deleteNizomFile(oldFileName);
          }
        }
      }
      
      setUploadingNizom(false);
    }

    if (editingMusobaqa) {
      updateMusobaqa(editingMusobaqa.id, { ...formData, nizomUrl });
    } else {
      addMusobaqa({ ...formData, nizomUrl });
    }
    setIsDialogOpen(false);
    resetForm();
    setUploadError(null);
  };

  const getStatusBadge = (holat: string) => {
    switch (holat) {
      case "faol":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Faol
          </Badge>
        );
      case "yakunlangan":
        return (
          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
            Yakunlangan
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Kelgusi
          </Badge>
        );
    }
  };

  const getParticipants = (kategoriya: string) => {
    return sportchilar.filter((s) => s.sport === kategoriya);
  };

  function AssignWinnersPanel({
    musobaqa,
    participants,
    onAssign,
  }: {
    musobaqa: Musobaqa;
    participants: typeof sportchilar;
    onAssign: (winners: { sportchiId: number; medal_turi: "oltin" | "kumush" | "bronza" }[]) => void;
  }) {
    const [gold, setGold] = useState<number | null>(null);
    const [silver, setSilver] = useState<number | null>(null);
    const [bronze, setBronze] = useState<number | null>(null);

    const submit = () => {
      const winners = [] as { sportchiId: number; medal_turi: "oltin" | "kumush" | "bronza" }[];
      if (gold) winners.push({ sportchiId: gold, medal_turi: "oltin" });
      if (silver) winners.push({ sportchiId: silver, medal_turi: "kumush" });
      if (bronze) winners.push({ sportchiId: bronze, medal_turi: "bronza" });
      if (winners.length > 0) onAssign(winners);
    };

    return (
      <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
        <h4 className="font-semibold mb-2">🏆 G'oliblarni belgilash</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Select value={gold?.toString() || ""} onValueChange={(v) => setGold(v ? Number(v) : null)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="1-o'rin (oltin)" />
            </SelectTrigger>
            <SelectContent>
              {participants.map((p) => (
                <SelectItem key={p.id} value={p.id.toString()}>
                  {p.avatar_emoji} {p.ism}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={silver?.toString() || ""} onValueChange={(v) => setSilver(v ? Number(v) : null)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="2-o'rin (kumush)" />
            </SelectTrigger>
            <SelectContent>
              {participants.map((p) => (
                <SelectItem key={p.id} value={p.id.toString()}>
                  {p.avatar_emoji} {p.ism}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={bronze?.toString() || ""} onValueChange={(v) => setBronze(v ? Number(v) : null)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="3-o'rin (bronza)" />
            </SelectTrigger>
            <SelectContent>
              {participants.map((p) => (
                <SelectItem key={p.id} value={p.id.toString()}>
                  {p.avatar_emoji} {p.ism}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end mt-3">
          <Button onClick={submit} className="bg-emerald-500 hover:bg-emerald-600">
            Saqlash
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Musobaqalar
        </h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              + Yangi musobaqa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMusobaqa ? "Musobaqani tahrirlash" : "Yangi musobaqa"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Musobaqa nomi"
                value={formData.nomi}
                onChange={(e) =>
                  setFormData({ ...formData, nomi: e.target.value })
                }
              />
              <Select
                value={formData.kategoriya}
                onValueChange={(v) => {
                  const sport = sportTurlari.find((s) => s.nomi === v);
                  setFormData({
                    ...formData,
                    kategoriya: v,
                    rasm_emoji: sport?.rasm_emoji || "🏆",
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategoriya" />
                </SelectTrigger>
                <SelectContent>
                  {sportTurlari.map((s) => (
                    <SelectItem key={s.id} value={s.nomi}>
                      {s.rasm_emoji} {s.nomi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={formData.sana}
                onChange={(e) =>
                  setFormData({ ...formData, sana: e.target.value })
                }
              />
              <Select
                value={formData.joy}
                onValueChange={(v) => setFormData({ ...formData, joy: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Joy" />
                </SelectTrigger>
                <SelectContent>
                  {sportJoylari.map((j) => (
                    <SelectItem key={j.id} value={j.nomi}>
                      📍 {j.nomi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Max ishtirokchilar"
                  value={formData.maksimal_ishtirokchilar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maksimal_ishtirokchilar: Number(e.target.value),
                    })
                  }
                />
                <Select
                  value={formData.holat}
                  onValueChange={(v: "kelgusi" | "faol" | "yakunlangan") =>
                    setFormData({ ...formData, holat: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kelgusi">Kelgusi</SelectItem>
                    <SelectItem value="faol">Faol</SelectItem>
                    <SelectItem value="yakunlangan">Yakunlangan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Tavsif"
                value={formData.tavsif}
                onChange={(e) =>
                  setFormData({ ...formData, tavsif: e.target.value })
                }
              />
              <Textarea
                placeholder="Mukofotlar"
                value={formData.mukofotlar}
                onChange={(e) =>
                  setFormData({ ...formData, mukofotlar: e.target.value })
                }
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">📄 Nizom (hujjat)</label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    setFormData({ ...formData, nizom: e.target.files?.[0] || null });
                    setUploadError(null);
                  }}
                  disabled={uploadingNizom}
                />
                {formData.nizom && (
                  <p className="text-xs text-blue-600">
                    📎 Tanlangan fayl: {formData.nizom.name} ({(formData.nizom.size / 1024).toFixed(1)} KB)
                  </p>
                )}
                {formData.nizomUrl && !formData.nizom && (
                  <p className="text-xs text-green-600">
                    ✓ Hozirgi nizom: {formData.nizomUrl}
                  </p>
                )}
                {uploadingNizom && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Nizom yuklanmoqda...
                  </div>
                )}
                {uploadError && (
                  <p className="text-xs text-red-600">
                    ❌ {uploadError}
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  Faqat PDF, DOC, DOCX formatlari (max 10MB)
                </p>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                disabled={uploadingNizom}
              >
                {uploadingNizom ? "Yuklanmoqda..." : (editingMusobaqa ? "Saqlash" : "Qo'shish")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Select value={filterSport} onValueChange={setFilterSport}>
              <SelectTrigger className="w-64">
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
          </div>
        </CardContent>
      </Card>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMusobaqalar.map((musobaqa) => (
          <Card
            key={musobaqa.id}
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
            <CardContent className="p-6">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {musobaqa.rasm_emoji}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {musobaqa.nomi}
              </h3>
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mb-3">
                <p>🎯 {musobaqa.kategoriya}</p>
                <p>📅 {musobaqa.sana}</p>
                <p>📍 {musobaqa.joy}</p>
                <p>
                  👥 {musobaqa.ishtirokchilar_soni}/
                  {musobaqa.maksimal_ishtirokchilar} ishtirokchi
                </p>
              </div>
              <div className="flex justify-between items-center mb-3">
                {getStatusBadge(musobaqa.holat)}
                <Button size="sm" onClick={() => setDetailModal(musobaqa)}>
                  📋 Batafsil
                </Button>
              </div>
              <div className="flex gap-2">
                {!(musobaqa.winners && musobaqa.winners.length > 0 && currentUser && musobaqa.ownerId === currentUser.id && !currentUser.isAdmin) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openEditDialog(musobaqa)}
                  >
                    ✏️ Tahrirlash
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMusobaqalar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday musobaqa topilmadi
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <Dialog open={!!detailModal} onOpenChange={() => setDetailModal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {detailModal && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{detailModal.rasm_emoji}</span>
                  <div>
                    <DialogTitle className="text-2xl">
                      {detailModal.nomi}
                    </DialogTitle>
                    <p className="text-slate-600 dark:text-slate-400">
                      {detailModal.kategoriya}
                    </p>
                  </div>
                </div>
                {detailModal.winners && detailModal.winners.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">🏅 G'oliblar</h3>
                    <div className="flex gap-2">
                      {detailModal.winners.map((w) => {
                        const p = sportchilar.find((s) => s.id === w.sportchiId);
                        const emoji = w.medal_turi === "oltin" ? "🥇" : w.medal_turi === "kumush" ? "🥈" : "🥉";
                        return (
                          <div key={w.sportchiId} className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <div className="font-semibold">{emoji} {p?.ism}</div>
                            <div className="text-sm text-slate-500">{p?.sport}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      📅 Sana
                    </p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {detailModal.sana}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      📍 Joy
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {detailModal.joy}
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      👥 Ishtirokchilar
                    </p>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {detailModal.ishtirokchilar_soni}/
                      {detailModal.maksimal_ishtirokchilar}
                    </p>
                  </div>
                </div>

                {detailModal.tavsif && (
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      📝 Tavsif
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {detailModal.tavsif}
                    </p>
                  </div>
                )}

                {detailModal.mukofotlar && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      🏅 Mukofotlar
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                      {detailModal.mukofotlar}
                    </p>
                  </div>
                )}

                {detailModal.nizomUrl && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      📄 Nizom
                    </h3>
                    <a
                      href={detailModal.nizomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                    >
                      📎 Nizom hujjatini yuklab olish
                    </a>
                  </div>
                )}

                {/* Participants */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                    👥 Ishtirokchilar (
                    {getParticipants(detailModal.kategoriya).length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getParticipants(detailModal.kategoriya).map((sportchi) => (
                      <div
                        key={sportchi.id}
                        className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl"
                      >
                        <div className="text-3xl">{sportchi.avatar_emoji}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 dark:text-white">
                            {sportchi.ism}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {sportchi.sport} • {sportchi.fakultet}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                              🏅 {sportchi.medallar}
                            </span>
                            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                              ⭐ {sportchi.yulduzlar}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {getParticipants(detailModal.kategoriya).length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <p className="text-4xl mb-2">👤</p>
                      <p>Hozircha hech kim ro'yxatdan o'tmagan</p>
                    </div>
                  )}
                </div>
              </div>
              {/* Assign winners button for owner or admin when winners not set */}
              {detailModal && currentUser && (currentUser.isAdmin || detailModal.ownerId === currentUser.id) && (!detailModal.winners || detailModal.winners.length === 0) && (
                <div className="mt-4">
                  <AssignWinnersPanel
                    musobaqa={detailModal}
                    participants={getParticipants(detailModal.kategoriya)}
                    onAssign={(winners) => {
                      assignWinners(detailModal.id, winners);
                    }}
                  />
                </div>
              )}

              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={() => setDetailModal(null)}>
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
