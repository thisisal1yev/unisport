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

export function MusobaqalarPage() {
  const {
    sportTurlari,
    musobaqalar,
    sportchilar,
    addMusobaqa,
    updateMusobaqa,
    deleteMusobaqa,
  } = useApp();

  const [filterSport, setFilterSport] = useState("all");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModal, setDetailModal] = useState<Musobaqa | null>(null);
  const [editModal, setEditModal] = useState<Musobaqa | null>(null);

  const [formData, setFormData] = useState({
    nomi: "",
    kategoriya: "",
    sana: "",
    joy: "",
    ishtirokchilar_soni: "0",
    maksimal_ishtirokchilar: "32",
    rasm_emoji: "🏆",
    tavsif: "",
    mukofotlar: "",
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
      ishtirokchilar_soni: "0",
      maksimal_ishtirokchilar: "32",
      rasm_emoji: "🏆",
      tavsif: "",
      mukofotlar: "",
    });
  };

  const handleAdd = () => {
    addMusobaqa({
      nomi: formData.nomi,
      kategoriya: formData.kategoriya,
      sana: formData.sana,
      joy: formData.joy,
      ishtirokchilar_soni: Number.parseInt(formData.ishtirokchilar_soni),
      maksimal_ishtirokchilar: Number.parseInt(
        formData.maksimal_ishtirokchilar,
      ),
      holat: "kelgusi",
      rasm_emoji: formData.rasm_emoji,
      tavsif: formData.tavsif,
      mukofotlar: formData.mukofotlar,
    });
    resetForm();
    setAddModalOpen(false);
  };

  const handleUpdate = () => {
    if (!editModal) return;
    updateMusobaqa(editModal.id, {
      nomi: formData.nomi,
      kategoriya: formData.kategoriya,
      sana: formData.sana,
      joy: formData.joy,
      ishtirokchilar_soni: Number.parseInt(formData.ishtirokchilar_soni),
      maksimal_ishtirokchilar: Number.parseInt(
        formData.maksimal_ishtirokchilar,
      ),
      rasm_emoji: formData.rasm_emoji,
      tavsif: formData.tavsif,
      mukofotlar: formData.mukofotlar,
    });
    resetForm();
    setEditModal(null);
  };

  const openEditModal = (musobaqa: Musobaqa) => {
    setFormData({
      nomi: musobaqa.nomi,
      kategoriya: musobaqa.kategoriya,
      sana: musobaqa.sana,
      joy: musobaqa.joy,
      ishtirokchilar_soni: musobaqa.ishtirokchilar_soni.toString(),
      maksimal_ishtirokchilar: musobaqa.maksimal_ishtirokchilar.toString(),
      rasm_emoji: musobaqa.rasm_emoji,
      tavsif: musobaqa.tavsif || "",
      mukofotlar: musobaqa.mukofotlar || "",
    });
    setEditModal(musobaqa);
  };

  const handleDelete = (id: number) => {
    if (confirm("Haqiqatan ham bu musobaqani o'chirmoqchimisiz?")) {
      deleteMusobaqa(id);
    }
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

  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Nomi *
        </label>
        <Input
          value={formData.nomi}
          onChange={(e) => setFormData({ ...formData, nomi: e.target.value })}
          placeholder="Musobaqa nomi"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Kategoriya *
          </label>
          <Select
            value={formData.kategoriya}
            onValueChange={(value) =>
              setFormData({ ...formData, kategoriya: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sport turini tanlang" />
            </SelectTrigger>
            <SelectContent>
              {sportTurlari.map((sport) => (
                <SelectItem key={sport.id} value={sport.nomi}>
                  {sport.rasm_emoji} {sport.nomi}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Sana *
          </label>
          <Input
            type="date"
            value={formData.sana}
            onChange={(e) => setFormData({ ...formData, sana: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Joy
        </label>
        <Input
          value={formData.joy}
          onChange={(e) => setFormData({ ...formData, joy: e.target.value })}
          placeholder="O'tkazilish joyi"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Maksimal ishtirokchilar
          </label>
          <Input
            type="number"
            min="0"
            value={formData.maksimal_ishtirokchilar}
            onChange={(e) =>
              setFormData({
                ...formData,
                maksimal_ishtirokchilar: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Emoji
          </label>
          <Input
            value={formData.rasm_emoji}
            onChange={(e) =>
              setFormData({ ...formData, rasm_emoji: e.target.value })
            }
            maxLength={2}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Tavsif
        </label>
        <Textarea
          value={formData.tavsif}
          onChange={(e) => setFormData({ ...formData, tavsif: e.target.value })}
          placeholder="Musobaqa haqida qisqacha ma'lumot"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Mukofotlar
        </label>
        <Textarea
          value={formData.mukofotlar}
          onChange={(e) =>
            setFormData({ ...formData, mukofotlar: e.target.value })
          }
          placeholder="1-o'rin: ...&#10;2-o'rin: ..."
          rows={3}
        />
      </div>
      <div className="flex gap-4 pt-4">
        <Button
          className="flex-1"
          onClick={isEdit ? handleUpdate : handleAdd}
          disabled={!formData.nomi || !formData.kategoriya || !formData.sana}
        >
          {isEdit ? "Saqlash" : "Qo'shish"}
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            resetForm();
            setAddModalOpen(false);
            setEditModal(null);
          }}
        >
          Bekor qilish
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Musobaqalar
        </h1>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700">
              <span className="mr-2">🏆</span> Musobaqa qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>🏆 Musobaqa qo'shish</DialogTitle>
            </DialogHeader>
            <FormContent />
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
              <div className="flex justify-between items-start mb-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {musobaqa.rasm_emoji}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(musobaqa.id)}
                  className="text-xl hover:scale-110 transition-transform"
                >
                  🗑️
                </button>
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
              <div className="flex justify-between items-center">
                {getStatusBadge(musobaqa.holat)}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditModal(musobaqa)}
                  >
                    ✏️
                  </Button>
                  <Button size="sm" onClick={() => setDetailModal(musobaqa)}>
                    📋 Batafsil
                  </Button>
                </div>
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
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Basic Info */}
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

                {/* Description */}
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

                {/* Prizes */}
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

                {/* Registration */}
                {detailModal.holat === "kelgusi" &&
                  detailModal.ishtirokchilar_soni <
                    detailModal.maksimal_ishtirokchilar && (
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        Ishtirok etmoqchimisiz?
                      </h3>
                      <p className="mb-4">
                        Bo'sh joylar:{" "}
                        {detailModal.maksimal_ishtirokchilar -
                          detailModal.ishtirokchilar_soni}
                      </p>
                      <Button variant="secondary" size="lg">
                        ✅ Ro'yxatdan o'tish
                      </Button>
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

              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={() => setDetailModal(null)}>
                  Yopish
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editModal} onOpenChange={() => setEditModal(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>✏️ Musobaqani tahrirlash</DialogTitle>
          </DialogHeader>
          <FormContent isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
}
