"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApp } from "@/lib/store";
import type { Klub, Sportchi } from "@/lib/types";
import { useState } from "react";

export default function KlublarPage() {
  const { klublar, sportchilar } = useApp();

  const [membersModal, setMembersModal] = useState<Klub | null>(null);

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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        Klublar
      </h1>

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
                  <button
                    type="button"
                    onClick={() => setMembersModal(klub)}
                    className="text-xl hover:scale-110 transition-transform"
                    title="A'zolarni ko'rish"
                  >
                    👥
                  </button>
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
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg mb-3">
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      👑 Lider: {klub.lider.ism}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
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
                    </div>
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                👥 Klub A'zolari
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getKlubMembers(membersModal).length > 0 ? (
                  getKlubMembers(membersModal).map((member) => (
                    <div
                      key={member.id}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{member.avatar_emoji}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 dark:text-white">
                            {member.ism}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {member.sport} • {member.fakultet}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary">🏅 {member.medallar}</Badge>
                            <Badge variant="secondary">⭐ {member.yulduzlar}</Badge>
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
    </div>
  );
}
