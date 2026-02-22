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
import type { Musobaqa, Sportchi } from "@/lib/types";
import { useState } from "react";

function AssignWinnersInline({
  musobaqa,
  participants,
  onAssign,
}: {
  musobaqa: Musobaqa;
  participants: Sportchi[];
  onAssign: (winners: { sportchiId: number; medal_turi: "oltin" | "kumush" | "bronza" }[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [gold, setGold] = useState<number | null>(null);
  const [silver, setSilver] = useState<number | null>(null);
  const [bronze, setBronze] = useState<number | null>(null);

  const submit = () => {
    const winners = [] as { sportchiId: number; medal_turi: "oltin" | "kumush" | "bronza" }[];
    if (gold) winners.push({ sportchiId: gold, medal_turi: "oltin" });
    if (silver) winners.push({ sportchiId: silver, medal_turi: "kumush" });
    if (bronze) winners.push({ sportchiId: bronze, medal_turi: "bronza" });
    if (winners.length > 0) onAssign(winners);
    setOpen(false);
  };

  return (
    <div>
      <Button size="sm" onClick={() => setOpen((s) => !s)}>
        🏆 G'oliblar
      </Button>
      {open && (
        <div className="p-3 bg-slate-50 rounded mt-2">
          <div className="grid grid-cols-1 gap-2">
            <Select value={gold?.toString() || ""} onValueChange={(v) => setGold(v ? Number(v) : null)}>
              <SelectTrigger>
                <SelectValue placeholder="1-o'rin" />
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
              <SelectTrigger>
                <SelectValue placeholder="2-o'rin" />
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
              <SelectTrigger>
                <SelectValue placeholder="3-o'rin" />
              </SelectTrigger>
              <SelectContent>
                {participants.map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.avatar_emoji} {p.ism}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end">
              <Button size="sm" onClick={submit} className="bg-emerald-500 hover:bg-emerald-600">
                Saqlash
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MusobaqalarManager() {
  const {
    musobaqalar,
    sportTurlari,
    sportJoylari,
    addMusobaqa,
    updateMusobaqa,
    deleteMusobaqa,
    sportchilar,
    assignWinners,
    currentUser,
  } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMusobaqa, setEditingMusobaqa] = useState<Musobaqa | null>(null);
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
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingMusobaqa) {
      updateMusobaqa(editingMusobaqa.id, formData);
    } else {
      addMusobaqa(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const holatBadge = (holat: string) => {
    switch (holat) {
      case "faol":
        return <Badge className="bg-green-500">Faol</Badge>;
      case "yakunlangan":
        return <Badge variant="secondary">Yakunlangan</Badge>;
      default:
        return <Badge className="bg-blue-500">Kelgusi</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Musobaqalar ({musobaqalar.length})
        </h2>
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
              <Button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {editingMusobaqa ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {musobaqalar.map((m) => (
          <Card key={m.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-2xl">
                    {m.rasm_emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      {m.nomi}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>{m.kategoriya}</span>
                      <span>•</span>
                      <span>{m.sana}</span>
                      <span>•</span>
                      {holatBadge(m.holat)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">
                    {m.ishtirokchilar_soni}/{m.maksimal_ishtirokchilar}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(m)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMusobaqa(m.id)}
                  >
                    🗑️
                  </Button>
                  {/* Admin assign winners inline */}
                  {currentUser && currentUser.isAdmin && (!m.winners || m.winners.length === 0) && (
                    <AssignWinnersInline musobaqa={m} participants={sportchilar.filter((s) => s.sport === m.kategoriya)} onAssign={(winners) => assignWinners(m.id, winners)} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
