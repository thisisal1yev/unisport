"use client";

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
import type { Klub, Sportchi } from "@/lib/types";
import { useState } from "react";

export function KlublarPage() {
  const { sportTurlari, klublar, sportchilar, addKlub, deleteKlub } = useApp();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [membersModal, setMembersModal] = useState<Klub | null>(null);
  const [leaderModal, setLeaderModal] = useState<Klub | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<string>("");

  const [formData, setFormData] = useState({
    nomi: "",
    tavsif: "",
    sport_turi: "",
    rasm_emoji: "⚽",
  });

  const resetForm = () => {
    setFormData({
      nomi: "",
      tavsif: "",
      sport_turi: "",
      rasm_emoji: "⚽",
    });
  };

  const handleAdd = () => {
    addKlub({
      nomi: formData.nomi,
      tavsif: formData.tavsif,
      sport_turi: formData.sport_turi,
      rasm_emoji: formData.rasm_emoji,
      azolar_soni: 0,
    });
    resetForm();
    setAddModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Haqiqatan ham bu klubni o'chirmoqchimisiz?")) {
      deleteKlub(id);
    }
  };

  const getKlubMembers = (klub: Klub): Sportchi[] => {
    return sportchilar.filter((s) => s.klub_id === klub.id);
  };

  const getKlubStats = (klub: Klub) => {
    const members = getKlubMembers(klub);
    const totalMedals = members.reduce((sum, m) => sum + m.medallar, 0);
    const avgRating =
      members.length > 0
        ? (
            members.reduce((sum, m) => sum + m.yulduzlar, 0) / members.length
          ).toFixed(1)
        : 0;
    return { totalMedals, avgRating, memberCount: members.length };
  };

  const FormContent = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Klub nomi *
        </label>
        <Input
          value={formData.nomi}
          onChange={(e) => setFormData({ ...formData, nomi: e.target.value })}
          placeholder="Klub nomi"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Tavsif
        </label>
        <Textarea
          value={formData.tavsif}
          onChange={(e) => setFormData({ ...formData, tavsif: e.target.value })}
          placeholder="Klub haqida qisqacha ma'lumot"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Sport turi *
        </label>
        <Select
          value={formData.sport_turi}
          onValueChange={(value) =>
            setFormData({ ...formData, sport_turi: value })
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
      <div className="flex gap-4 pt-4">
        <Button
          className="flex-1"
          onClick={handleAdd}
          disabled={!formData.nomi || !formData.sport_turi}
        >
          Saqlash
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            resetForm();
            setAddModalOpen(false);
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
          Klublar
        </h1>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              <span className="mr-2">+</span> Yangi klub qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yangi klub qo'shish</DialogTitle>
            </DialogHeader>
            <FormContent />
          </DialogContent>
        </Dialog>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {klublar.map((klub) => {
          const stats = getKlubStats(klub);
          return (
            <Card
              key={klub.id}
              className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {klub.rasm_emoji}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMembersModal(klub)}
                      className="text-xl hover:scale-110 transition-transform"
                      title="A'zolarni ko'rish"
                    >
                      👥
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLeaderModal(klub);
                        setSelectedLeader("");
                      }}
                      className="text-xl hover:scale-110 transition-transform"
                      title="Lider tayinlash"
                    >
                      👑
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {klub.nomi}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                  {klub.tavsif}
                </p>
                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mb-3">
                  <p>{klub.sport_turi}</p>
                  <p>👥 {stats.memberCount} a'zo</p>
                </div>
                {klub.lider ? (
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      👑 Lider: {klub.lider.ism}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    👑 Lider tayinlanmagan
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {klublar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚽</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday klub topilmadi
          </p>
        </div>
      )}

      {/* Members Modal */}
      <Dialog open={!!membersModal} onOpenChange={() => setMembersModal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {membersModal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {membersModal.nomi}
                </DialogTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  {membersModal.tavsif}
                </p>
              </DialogHeader>

              {/* Club Stats */}
              <div className="grid grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {getKlubStats(membersModal).memberCount}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    A'zolar soni
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {getKlubStats(membersModal).totalMedals}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Jami medallar
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {getKlubStats(membersModal).avgRating} ⭐
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    O'rtacha reyting
                  </div>
                </div>
              </div>

              {/* Leader Info */}
              {membersModal.lider && (
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                    👑 Klub Lideri
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">👑</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 dark:text-white">
                        {membersModal.lider.ism}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {membersModal.lider.sport}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-sm">
                          🏅 {membersModal.lider.medallar} medal
                        </span>
                        <span className="text-sm">
                          {"⭐".repeat(membersModal.lider.yulduzlar)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Members List */}
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                👥 Klub A'zolari
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getKlubMembers(membersModal).length > 0 ? (
                  getKlubMembers(membersModal).map((member) => (
                    <div
                      key={member.id}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{member.avatar_emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-800 dark:text-white">
                              {member.ism}
                            </h4>
                            {membersModal.lider?.id === member.id && (
                              <span className="text-yellow-500 text-xl">
                                👑
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {member.sport}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {member.fakultet}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {member.guruh}
                          </p>
                          <div className="flex gap-3 mt-2">
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                              {member.daraja}
                            </span>
                            <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                              🏅 {member.medallar}
                            </span>
                            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                              {"⭐".repeat(member.yulduzlar)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-slate-500">
                    <p className="text-4xl mb-2">👥</p>
                    <p>Hozircha klub a'zolari yo'q</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setMembersModal(null)}>
                  Yopish
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Leader Assignment Modal */}
      <Dialog open={!!leaderModal} onOpenChange={() => setLeaderModal(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Klubga lider tayinlash</DialogTitle>
          </DialogHeader>
          {leaderModal && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Sportchini tanlang
                </label>
                <Select
                  value={selectedLeader}
                  onValueChange={setSelectedLeader}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sportchini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {getKlubMembers(leaderModal).map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.avatar_emoji} {member.ism} - {member.sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  disabled={!selectedLeader}
                  onClick={() => {
                    // In a real app, this would update the leader
                    alert(`Lider tayinlandi: ${selectedLeader}`);
                    setLeaderModal(null);
                  }}
                >
                  Tayinlash
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setLeaderModal(null)}
                >
                  Bekor qilish
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
