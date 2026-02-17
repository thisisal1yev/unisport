"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Sportchi, Klub, Musobaqa, SportJoy, Yangilik, Yutuq, User } from "@/lib/types";

type TabType = "dashboard" | "sportchilar" | "klublar" | "musobaqalar" | "sport-joylari" | "yangiliklar" | "yutuqlar" | "users";

export function AdminPage() {
  const {
    sportchilar,
    klublar,
    musobaqalar,
    sportJoylari,
    yangiliklar,
    yutuqlar,
    users,
    sportTurlari,
    // CRUD operations
    addSportchi,
    updateSportchi,
    deleteSportchi,
    addKlub,
    updateKlub,
    deleteKlub,
    addMusobaqa,
    updateMusobaqa,
    deleteMusobaqa,
    addSportJoy,
    updateSportJoy,
    deleteSportJoy,
    addYangilik,
    updateYangilik,
    deleteYangilik,
    addYutuq,
    deleteYutuq,
    deleteUser,
    toggleUserAdmin,
    currentUser,
    setCurrentPage,
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // Check if current user is admin
  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Ruxsat yo'q
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Admin paneliga kirish uchun administrator huquqiga ega bo'lishingiz kerak.
            </p>
            <Button onClick={() => setCurrentPage("dashboard")}>
              Asosiy sahifaga qaytish
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: "📊" },
    { id: "sportchilar" as TabType, label: "Sportchilar", icon: "🤾‍♂️" },
    { id: "klublar" as TabType, label: "Klublar", icon: "⚽" },
    { id: "musobaqalar" as TabType, label: "Musobaqalar", icon: "📅" },
    { id: "sport-joylari" as TabType, label: "Sport joylari", icon: "📍" },
    { id: "yangiliklar" as TabType, label: "Yangiliklar", icon: "📰" },
    { id: "yutuqlar" as TabType, label: "Yutuqlar", icon: "🏅" },
    { id: "users" as TabType, label: "Foydalanuvchilar", icon: "👥" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Admin Panel
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Platformani boshqarish
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          Admin: {currentUser.ism} {currentUser.familiya}
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[500px]">
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "sportchilar" && <SportchilarManager />}
        {activeTab === "klublar" && <KlublarManager />}
        {activeTab === "musobaqalar" && <MusobaqalarManager />}
        {activeTab === "sport-joylari" && <SportJoylariManager />}
        {activeTab === "yangiliklar" && <YangiliklarManager />}
        {activeTab === "yutuqlar" && <YutuqlarManager />}
        {activeTab === "users" && <UsersManager />}
      </div>
    </div>
  );
}

// Dashboard Component
function AdminDashboard() {
  const { sportchilar, klublar, musobaqalar, sportJoylari, yangiliklar, yutuqlar, users } = useApp();

  const stats = [
    { label: "Sportchilar", value: sportchilar.length, icon: "🤾‍♂️", color: "from-blue-500 to-blue-600" },
    { label: "Klublar", value: klublar.length, icon: "⚽", color: "from-emerald-500 to-emerald-600" },
    { label: "Musobaqalar", value: musobaqalar.length, icon: "📅", color: "from-orange-500 to-orange-600" },
    { label: "Sport joylari", value: sportJoylari.length, icon: "📍", color: "from-purple-500 to-purple-600" },
    { label: "Yangiliklar", value: yangiliklar.length, icon: "📰", color: "from-pink-500 to-pink-600" },
    { label: "Yutuqlar", value: yutuqlar.length, icon: "🏅", color: "from-yellow-500 to-yellow-600" },
    { label: "Foydalanuvchilar", value: users.length, icon: "👥", color: "from-cyan-500 to-cyan-600" },
    { label: "Adminlar", value: users.filter(u => u.isAdmin).length, icon: "🔐", color: "from-red-500 to-red-600" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="overflow-hidden">
          <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Sportchilar Manager
function SportchilarManager() {
  const { sportchilar, sportTurlari, klublar, addSportchi, updateSportchi, deleteSportchi } = useApp();
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Sportchilar ({sportchilar.length})
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              + Yangi sportchi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSportchi ? "Sportchini tahrirlash" : "Yangi sportchi qo'shish"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Ism familiya"
                value={formData.ism}
                onChange={(e) => setFormData({ ...formData, ism: e.target.value })}
              />
              <Select value={formData.sport} onValueChange={(v) => setFormData({ ...formData, sport: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sport turi" />
                </SelectTrigger>
                <SelectContent>
                  {sportTurlari.map((s) => (
                    <SelectItem key={s.id} value={s.nomi}>{s.rasm_emoji} {s.nomi}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Fakultet"
                  value={formData.fakultet}
                  onChange={(e) => setFormData({ ...formData, fakultet: e.target.value })}
                />
                <Input
                  placeholder="Guruh"
                  value={formData.guruh}
                  onChange={(e) => setFormData({ ...formData, guruh: e.target.value })}
                />
              </div>
              <Select value={formData.daraja} onValueChange={(v: "Boshlovchi" | "Havaskor" | "Professional") => setFormData({ ...formData, daraja: v })}>
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
                  onChange={(e) => setFormData({ ...formData, medallar: Number(e.target.value) })}
                />
                <Input
                  type="number"
                  placeholder="Tug'ilgan yil"
                  value={formData.tug_yil}
                  onChange={(e) => setFormData({ ...formData, tug_yil: Number(e.target.value) })}
                />
              </div>
              <Input
                placeholder="Telefon"
                value={formData.telefon}
                onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
              />
              <Select value={formData.klub_id?.toString() || ""} onValueChange={(v) => {
                const klub = klublar.find(k => k.id === Number(v));
                setFormData({ ...formData, klub_id: Number(v), klub: klub?.nomi || "" });
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Klub (ixtiyoriy)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Klub yo'q</SelectItem>
                  {klublar.map((k) => (
                    <SelectItem key={k.id} value={k.id.toString()}>{k.rasm_emoji} {k.nomi}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
              <Button onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600">
                {editingSportchi ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {sportchilar.map((sportchi) => (
          <Card key={sportchi.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">
                    {sportchi.avatar_emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{sportchi.ism}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>{sportchi.sport}</span>
                      <span>•</span>
                      <Badge variant={sportchi.daraja === "Professional" ? "default" : "secondary"}>
                        {sportchi.daraja}
                      </Badge>
                      <span>•</span>
                      <span>🏅 {sportchi.medallar}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(sportchi)}>
                    ✏️
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(sportchi.id)}>
                    🗑️
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Klublar Manager
function KlublarManager() {
  const { klublar, sportTurlari, addKlub, updateKlub, deleteKlub } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKlub, setEditingKlub] = useState<Klub | null>(null);
  const [formData, setFormData] = useState({
    nomi: "",
    tavsif: "",
    sport_turi: "",
    rasm_emoji: "⚽",
    azolar_soni: 0,
  });

  const resetForm = () => {
    setFormData({ nomi: "", tavsif: "", sport_turi: "", rasm_emoji: "⚽", azolar_soni: 0 });
    setEditingKlub(null);
  };

  const openEditDialog = (klub: Klub) => {
    setEditingKlub(klub);
    setFormData({
      nomi: klub.nomi,
      tavsif: klub.tavsif,
      sport_turi: klub.sport_turi,
      rasm_emoji: klub.rasm_emoji,
      azolar_soni: klub.azolar_soni,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingKlub) {
      updateKlub(editingKlub.id, formData);
    } else {
      addKlub(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Klublar ({klublar.length})
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">+ Yangi klub</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingKlub ? "Klubni tahrirlash" : "Yangi klub qo'shish"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Klub nomi" value={formData.nomi} onChange={(e) => setFormData({ ...formData, nomi: e.target.value })} />
              <Select value={formData.sport_turi} onValueChange={(v) => {
                const sport = sportTurlari.find(s => s.nomi === v);
                setFormData({ ...formData, sport_turi: v, rasm_emoji: sport?.rasm_emoji || "⚽" });
              }}>
                <SelectTrigger><SelectValue placeholder="Sport turi" /></SelectTrigger>
                <SelectContent>
                  {sportTurlari.map((s) => (
                    <SelectItem key={s.id} value={s.nomi}>{s.rasm_emoji} {s.nomi}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea placeholder="Tavsif" value={formData.tavsif} onChange={(e) => setFormData({ ...formData, tavsif: e.target.value })} />
              <Button onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600">
                {editingKlub ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {klublar.map((klub) => (
          <Card key={klub.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl">
                    {klub.rasm_emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{klub.nomi}</h3>
                    <p className="text-sm text-slate-500">{klub.sport_turi} • {klub.azolar_soni} a'zo</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(klub)}>✏️</Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteKlub(klub.id)}>🗑️</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Musobaqalar Manager
function MusobaqalarManager() {
  const { musobaqalar, sportTurlari, sportJoylari, addMusobaqa, updateMusobaqa, deleteMusobaqa } = useApp();
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
      nomi: "", kategoriya: "", sana: "", joy: "", ishtirokchilar_soni: 0,
      maksimal_ishtirokchilar: 32, holat: "kelgusi", rasm_emoji: "🏆", tavsif: "", mukofotlar: ""
    });
    setEditingMusobaqa(null);
  };

  const openEditDialog = (m: Musobaqa) => {
    setEditingMusobaqa(m);
    setFormData({
      nomi: m.nomi, kategoriya: m.kategoriya, sana: m.sana, joy: m.joy,
      ishtirokchilar_soni: m.ishtirokchilar_soni, maksimal_ishtirokchilar: m.maksimal_ishtirokchilar,
      holat: m.holat, rasm_emoji: m.rasm_emoji, tavsif: m.tavsif || "", mukofotlar: m.mukofotlar || ""
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
      case "faol": return <Badge className="bg-green-500">Faol</Badge>;
      case "yakunlangan": return <Badge variant="secondary">Yakunlangan</Badge>;
      default: return <Badge className="bg-blue-500">Kelgusi</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Musobaqalar ({musobaqalar.length})</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">+ Yangi musobaqa</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMusobaqa ? "Musobaqani tahrirlash" : "Yangi musobaqa"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Musobaqa nomi" value={formData.nomi} onChange={(e) => setFormData({ ...formData, nomi: e.target.value })} />
              <Select value={formData.kategoriya} onValueChange={(v) => {
                const sport = sportTurlari.find(s => s.nomi === v);
                setFormData({ ...formData, kategoriya: v, rasm_emoji: sport?.rasm_emoji || "🏆" });
              }}>
                <SelectTrigger><SelectValue placeholder="Kategoriya" /></SelectTrigger>
                <SelectContent>
                  {sportTurlari.map((s) => (
                    <SelectItem key={s.id} value={s.nomi}>{s.rasm_emoji} {s.nomi}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input type="date" value={formData.sana} onChange={(e) => setFormData({ ...formData, sana: e.target.value })} />
              <Select value={formData.joy} onValueChange={(v) => setFormData({ ...formData, joy: v })}>
                <SelectTrigger><SelectValue placeholder="Joy" /></SelectTrigger>
                <SelectContent>
                  {sportJoylari.map((j) => (
                    <SelectItem key={j.id} value={j.nomi}>📍 {j.nomi}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" placeholder="Max ishtirokchilar" value={formData.maksimal_ishtirokchilar} onChange={(e) => setFormData({ ...formData, maksimal_ishtirokchilar: Number(e.target.value) })} />
                <Select value={formData.holat} onValueChange={(v: "kelgusi" | "faol" | "yakunlangan") => setFormData({ ...formData, holat: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kelgusi">Kelgusi</SelectItem>
                    <SelectItem value="faol">Faol</SelectItem>
                    <SelectItem value="yakunlangan">Yakunlangan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea placeholder="Tavsif" value={formData.tavsif} onChange={(e) => setFormData({ ...formData, tavsif: e.target.value })} />
              <Textarea placeholder="Mukofotlar" value={formData.mukofotlar} onChange={(e) => setFormData({ ...formData, mukofotlar: e.target.value })} />
              <Button onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600">
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
                    <h3 className="font-semibold text-slate-800 dark:text-white">{m.nomi}</h3>
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
                  <span className="text-sm text-slate-500">{m.ishtirokchilar_soni}/{m.maksimal_ishtirokchilar}</span>
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(m)}>✏️</Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteMusobaqa(m.id)}>🗑️</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Sport Joylari Manager
function SportJoylariManager() {
  const { sportJoylari, sportTurlari, addSportJoy, updateSportJoy, deleteSportJoy } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJoy, setEditingJoy] = useState<SportJoy | null>(null);
  const [formData, setFormData] = useState({
    nomi: "", manzil: "", kenglik: 40.38, uzunlik: 71.78, tuman: "",
    sport_turlari: [] as string[], telefon: "", ish_vaqti: "", reyting: 4.0
  });

  const tumanlar = ["Farg'ona", "Marg'ilon", "Quva", "Qo'qon", "Rishton", "Oltiariq"];

  const resetForm = () => {
    setFormData({ nomi: "", manzil: "", kenglik: 40.38, uzunlik: 71.78, tuman: "", sport_turlari: [], telefon: "", ish_vaqti: "", reyting: 4.0 });
    setEditingJoy(null);
  };

  const openEditDialog = (joy: SportJoy) => {
    setEditingJoy(joy);
    setFormData({
      nomi: joy.nomi, manzil: joy.manzil, kenglik: joy.kenglik, uzunlik: joy.uzunlik,
      tuman: joy.tuman, sport_turlari: joy.sport_turlari, telefon: joy.telefon || "",
      ish_vaqti: joy.ish_vaqti || "", reyting: joy.reyting
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingJoy) {
      updateSportJoy(editingJoy.id, formData);
    } else {
      addSportJoy(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Sport joylari ({sportJoylari.length})</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">+ Yangi joy</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingJoy ? "Joyni tahrirlash" : "Yangi sport joyi"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Joy nomi" value={formData.nomi} onChange={(e) => setFormData({ ...formData, nomi: e.target.value })} />
              <Input placeholder="Manzil" value={formData.manzil} onChange={(e) => setFormData({ ...formData, manzil: e.target.value })} />
              <Select value={formData.tuman} onValueChange={(v) => setFormData({ ...formData, tuman: v })}>
                <SelectTrigger><SelectValue placeholder="Tuman" /></SelectTrigger>
                <SelectContent>
                  {tumanlar.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Telefon" value={formData.telefon} onChange={(e) => setFormData({ ...formData, telefon: e.target.value })} />
                <Input placeholder="Ish vaqti (06:00-22:00)" value={formData.ish_vaqti} onChange={(e) => setFormData({ ...formData, ish_vaqti: e.target.value })} />
              </div>
              <Input type="number" step="0.1" placeholder="Reyting (1-5)" value={formData.reyting} onChange={(e) => setFormData({ ...formData, reyting: Number(e.target.value) })} />
              <Button onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600">
                {editingJoy ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {sportJoylari.map((joy) => (
          <Card key={joy.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{joy.nomi}</h3>
                    <p className="text-sm text-slate-500">{joy.manzil} • ⭐ {joy.reyting}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(joy)}>✏️</Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteSportJoy(joy.id)}>🗑️</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Yangiliklar Manager
function YangiliklarManager() {
  const { yangiliklar, sportTurlari, addYangilik, updateYangilik, deleteYangilik } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingYangilik, setEditingYangilik] = useState<Yangilik | null>(null);
  const [formData, setFormData] = useState({
    sarlavha: "", mazmun: "", kategoriya: "", rasm_emoji: "📰",
    sana: new Date().toISOString().split("T")[0], layklar: 0, izohlar_soni: 0
  });

  const kategoriyalar = ["Umumiy", ...sportTurlari.map(s => s.nomi)];

  const resetForm = () => {
    setFormData({ sarlavha: "", mazmun: "", kategoriya: "", rasm_emoji: "📰", sana: new Date().toISOString().split("T")[0], layklar: 0, izohlar_soni: 0 });
    setEditingYangilik(null);
  };

  const openEditDialog = (y: Yangilik) => {
    setEditingYangilik(y);
    setFormData({
      sarlavha: y.sarlavha, mazmun: y.mazmun, kategoriya: y.kategoriya,
      rasm_emoji: y.rasm_emoji, sana: y.sana, layklar: y.layklar, izohlar_soni: y.izohlar_soni
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingYangilik) {
      updateYangilik(editingYangilik.id, formData);
    } else {
      addYangilik(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Yangiliklar ({yangiliklar.length})</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">+ Yangi yangilik</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingYangilik ? "Yangilikni tahrirlash" : "Yangi yangilik"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Sarlavha" value={formData.sarlavha} onChange={(e) => setFormData({ ...formData, sarlavha: e.target.value })} />
              <Select value={formData.kategoriya} onValueChange={(v) => {
                const sport = sportTurlari.find(s => s.nomi === v);
                setFormData({ ...formData, kategoriya: v, rasm_emoji: sport?.rasm_emoji || "📰" });
              }}>
                <SelectTrigger><SelectValue placeholder="Kategoriya" /></SelectTrigger>
                <SelectContent>
                  {kategoriyalar.map((k) => (
                    <SelectItem key={k} value={k}>{k}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea placeholder="Mazmun" rows={5} value={formData.mazmun} onChange={(e) => setFormData({ ...formData, mazmun: e.target.value })} />
              <Input type="date" value={formData.sana} onChange={(e) => setFormData({ ...formData, sana: e.target.value })} />
              <Button onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600">
                {editingYangilik ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {yangiliklar.map((y) => (
          <Card key={y.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-2xl">{y.rasm_emoji}</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white line-clamp-1">{y.sarlavha}</h3>
                    <p className="text-sm text-slate-500">{y.kategoriya} • {y.sana} • ❤️ {y.layklar}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(y)}>✏️</Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteYangilik(y.id)}>🗑️</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Yutuqlar Manager
function YutuqlarManager() {
  const { yutuqlar, sportchilar, addYutuq, deleteYutuq } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomi: "", sportchi: { id: 0, ism: "" }, musobaqa: "",
    medal_turi: "oltin" as "oltin" | "kumush" | "bronza",
    medal_soni: 1, sana: new Date().toISOString().split("T")[0], rasm_emoji: "🥇"
  });

  const resetForm = () => {
    setFormData({ nomi: "", sportchi: { id: 0, ism: "" }, musobaqa: "", medal_turi: "oltin", medal_soni: 1, sana: new Date().toISOString().split("T")[0], rasm_emoji: "🥇" });
  };

  const handleSubmit = () => {
    addYutuq(formData);
    setIsDialogOpen(false);
    resetForm();
  };

  const medalEmoji = (turi: string) => {
    switch (turi) {
      case "oltin": return "🥇";
      case "kumush": return "🥈";
      default: return "🥉";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Yutuqlar ({yutuqlar.length})</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">+ Yangi yutuq</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi yutuq qo'shish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Yutuq nomi" value={formData.nomi} onChange={(e) => setFormData({ ...formData, nomi: e.target.value })} />
              <Select value={formData.sportchi.id.toString()} onValueChange={(v) => {
                const sportchi = sportchilar.find(s => s.id === Number(v));
                if (sportchi) setFormData({ ...formData, sportchi: { id: sportchi.id, ism: sportchi.ism } });
              }}>
                <SelectTrigger><SelectValue placeholder="Sportchi" /></SelectTrigger>
                <SelectContent>
                  {sportchilar.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.avatar_emoji} {s.ism}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Musobaqa nomi" value={formData.musobaqa} onChange={(e) => setFormData({ ...formData, musobaqa: e.target.value })} />
              <Select value={formData.medal_turi} onValueChange={(v: "oltin" | "kumush" | "bronza") => setFormData({ ...formData, medal_turi: v, rasm_emoji: medalEmoji(v) })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="oltin">🥇 Oltin</SelectItem>
                  <SelectItem value="kumush">🥈 Kumush</SelectItem>
                  <SelectItem value="bronza">🥉 Bronza</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" value={formData.sana} onChange={(e) => setFormData({ ...formData, sana: e.target.value })} />
              <Button onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600">Qo'shish</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {yutuqlar.map((y) => (
          <Card key={y.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-2xl">{y.rasm_emoji}</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{y.nomi}</h3>
                    <p className="text-sm text-slate-500">{y.sportchi.ism} • {y.musobaqa} • {y.sana}</p>
                  </div>
                </div>
                <Button variant="destructive" size="sm" onClick={() => deleteYutuq(y.id)}>🗑️</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Users Manager
function UsersManager() {
  const { users, deleteUser, toggleUserAdmin, currentUser } = useApp();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Foydalanuvchilar ({users.length})</h2>

      <div className="grid gap-3">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">
                    {user.avatar_emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800 dark:text-white">{user.ism} {user.familiya}</h3>
                      {user.isAdmin && <Badge className="bg-red-500">Admin</Badge>}
                      {user.id === currentUser?.id && <Badge variant="outline">Siz</Badge>}
                    </div>
                    <p className="text-sm text-slate-500">{user.email} • {user.ro_yxatdan_sana}</p>
                  </div>
                </div>
                {user.id !== currentUser?.id && (
                  <div className="flex gap-2">
                    <Button
                      variant={user.isAdmin ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => toggleUserAdmin(user.id)}
                    >
                      {user.isAdmin ? "Admin o'chirish" : "Admin qilish"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => {
                      if (confirm("Foydalanuvchini o'chirmoqchimisiz?")) deleteUser(user.id);
                    }}>🗑️</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
