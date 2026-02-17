"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { fakultetlar, guruhlar } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { AVATAR_EMOJIS } from "@/lib/constants";
import {
  Calendar,
  Edit2,
  GraduationCap,
  LogOut,
  Mail,
  Phone,
  Ruler,
  Scale,
  Target,
  TrendingUp,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export function ProfilPage() {
  const {
    currentUser,
    updateProfile,
    logout,
    setCurrentPage,
    klublar,
    musobaqalar,
    leaveKlub,
    leaveMusobaqa,
    sportTurlari,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    ism: "",
    familiya: "",
    telefon: "",
    tug_sana: "",
    fakultet: "",
    guruh: "",
    vazn: "",
    boy: "",
    avatar_emoji: "🧑",
    bio: "",
    sport_turlari: [] as string[],
  });

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="text-6xl mb-4">🔐</div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Tizimga kiring
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
          Profilni ko'rish uchun tizimga kiring
        </p>
        <Button
          onClick={() => setCurrentPage("auth")}
          className="bg-emerald-600 hover:bg-emerald-700 px-8"
        >
          Kirish / Ro'yxatdan o'tish
        </Button>
      </div>
    );
  }

  const userKlublar = klublar.filter((k) =>
    currentUser.klublar_ids.includes(k.id),
  );
  const userMusobaqalar = musobaqalar.filter((m) =>
    currentUser.musobaqalar_ids.includes(m.id),
  );

  const handleSave = () => {
    updateProfile({
      ism: editData.ism,
      familiya: editData.familiya,
      telefon: editData.telefon || undefined,
      tug_sana: editData.tug_sana || undefined,
      fakultet: editData.fakultet || undefined,
      guruh: editData.guruh || undefined,
      vazn: editData.vazn ? Number.parseFloat(editData.vazn) : undefined,
      boy: editData.boy ? Number.parseFloat(editData.boy) : undefined,
      avatar_emoji: editData.avatar_emoji,
      bio: editData.bio || undefined,
      sport_turlari: editData.sport_turlari,
    });
    setIsEditing(false);
  };

  const openEditDialog = () => {
    setEditData({
      ism: currentUser.ism,
      familiya: currentUser.familiya,
      telefon: currentUser.telefon || "",
      tug_sana: currentUser.tug_sana || "",
      fakultet: currentUser.fakultet || "",
      guruh: currentUser.guruh || "",
      vazn: currentUser.vazn?.toString() || "",
      boy: currentUser.boy?.toString() || "",
      avatar_emoji: currentUser.avatar_emoji,
      bio: currentUser.bio || "",
      sport_turlari: currentUser.sport_turlari || [],
    });
    setIsEditing(true);
  };

  const toggleSport = (sport: string) => {
    setEditData((prev) => ({
      ...prev,
      sport_turlari: prev.sport_turlari.includes(sport)
        ? prev.sport_turlari.filter((s) => s !== sport)
        : [...prev.sport_turlari, sport],
    }));
  };

  const bmi =
    currentUser.vazn && currentUser.boy
      ? (currentUser.vazn / (currentUser.boy / 100) ** 2).toFixed(1)
      : null;

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Kam vazn", color: "text-amber-600" };
    if (bmi < 25) return { label: "Normal", color: "text-emerald-600" };
    if (bmi < 30) return { label: "Ortiqcha vazn", color: "text-orange-600" };
    return { label: "Semizlik", color: "text-red-600" };
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Mening Profilim
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Shaxsiy ma'lumotlar va sport faoliyati
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="gap-2"
                onClick={openEditDialog}
              >
                <Edit2 className="w-4 h-4" />
                Tahrirlash
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Profilni tahrirlash</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Avatar</label>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_EMOJIS.map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() =>
                          setEditData((prev) => ({
                            ...prev,
                            avatar_emoji: emoji,
                          }))
                        }
                        className={`w-10 h-10 text-xl rounded-lg transition-all ${
                          editData.avatar_emoji === emoji
                            ? "bg-emerald-100 ring-2 ring-emerald-500"
                            : "bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Ism"
                    value={editData.ism}
                    onChange={(e) =>
                      setEditData((p) => ({ ...p, ism: e.target.value }))
                    }
                  />
                  <Input
                    placeholder="Familiya"
                    value={editData.familiya}
                    onChange={(e) =>
                      setEditData((p) => ({ ...p, familiya: e.target.value }))
                    }
                  />
                </div>
                <Input
                  placeholder="Telefon"
                  value={editData.telefon}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, telefon: e.target.value }))
                  }
                />
                <Input
                  type="date"
                  value={editData.tug_sana}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, tug_sana: e.target.value }))
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={editData.fakultet}
                    onValueChange={(v) =>
                      setEditData((p) => ({ ...p, fakultet: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Fakultet" />
                    </SelectTrigger>
                    <SelectContent>
                      {fakultetlar.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={editData.guruh}
                    onValueChange={(v) =>
                      setEditData((p) => ({ ...p, guruh: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Guruh" />
                    </SelectTrigger>
                    <SelectContent>
                      {guruhlar.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Vazn (kg)"
                    value={editData.vazn}
                    onChange={(e) =>
                      setEditData((p) => ({ ...p, vazn: e.target.value }))
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Bo'y (cm)"
                    value={editData.boy}
                    onChange={(e) =>
                      setEditData((p) => ({ ...p, boy: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sport turlari</label>
                  <div className="flex flex-wrap gap-2">
                    {sportTurlari.slice(0, 8).map((sport) => (
                      <button
                        type="button"
                        key={sport.id}
                        onClick={() => toggleSport(sport.nomi)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          editData.sport_turlari.includes(sport.nomi)
                            ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-500"
                            : "bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        {sport.rasm_emoji} {sport.nomi}
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  placeholder="Bio"
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, bio: e.target.value }))
                  }
                />
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsEditing(false)}
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleSave}
                  >
                    Saqlash
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="destructive" className="gap-2" onClick={logout}>
            <LogOut className="w-4 h-4" />
            Chiqish
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-6xl shadow-lg">
              {currentUser.avatar_emoji}
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold">
                {currentUser.ism} {currentUser.familiya}
              </h2>
              <p className="text-emerald-100 mt-1">{currentUser.email}</p>
              {currentUser.bio && (
                <p className="text-white/80 mt-2">{currentUser.bio}</p>
              )}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                {currentUser.sport_turlari.map((sport) => (
                  <Badge
                    key={sport}
                    className="bg-white/20 text-white border-0"
                  >
                    {sport}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userKlublar.length}</p>
              <p className="text-sm text-slate-500">Klublar</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userMusobaqalar.length}</p>
              <p className="text-sm text-slate-500">Musobaqalar</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {currentUser.vazn ? `${currentUser.vazn}` : "—"}
              </p>
              <p className="text-sm text-slate-500">Vazn (kg)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Ruler className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {currentUser.boy ? `${currentUser.boy}` : "—"}
              </p>
              <p className="text-sm text-slate-500">Bo'y (cm)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BMI */}
      {bmi && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Tana massasi indeksi (BMI)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold">{bmi}</p>
                <p
                  className={`text-sm font-medium ${getBmiCategory(Number(bmi)).color}`}
                >
                  {getBmiCategory(Number(bmi)).label}
                </p>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-emerald-500 to-red-500"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>16</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              Shaxsiy ma'lumotlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium">{currentUser.email}</p>
              </div>
            </div>
            {currentUser.telefon && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Telefon</p>
                  <p className="font-medium">{currentUser.telefon}</p>
                </div>
              </div>
            )}
            {currentUser.tug_sana && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Tug'ilgan sana</p>
                  <p className="font-medium">{currentUser.tug_sana}</p>
                </div>
              </div>
            )}
            {currentUser.fakultet && (
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Fakultet</p>
                  <p className="font-medium">{currentUser.fakultet}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Jismoniy ko'rsatkichlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Vazn</p>
                <p className="font-medium">
                  {currentUser.vazn ? `${currentUser.vazn} kg` : "Kiritilmagan"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Bo'y</p>
                <p className="font-medium">
                  {currentUser.boy ? `${currentUser.boy} cm` : "Kiritilmagan"}
                </p>
              </div>
            </div>
            {bmi && (
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">BMI</p>
                  <p
                    className={`font-medium ${getBmiCategory(Number(bmi)).color}`}
                  >
                    {bmi} - {getBmiCategory(Number(bmi)).label}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Clubs */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Mening klublarim ({userKlublar.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userKlublar.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Siz hali hech qanday klubga a'zo emassiz</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setCurrentPage("klublar")}
              >
                Klublarni ko'rish
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userKlublar.map((klub) => (
                <div
                  key={klub.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow">
                      {klub.rasm_emoji}
                    </div>
                    <div>
                      <p className="font-semibold">{klub.nomi}</p>
                      <p className="text-sm text-slate-500">
                        {klub.sport_turi}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => leaveKlub(klub.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Competitions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            Mening musobaqalarim ({userMusobaqalar.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userMusobaqalar.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Trophy className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Siz hali hech qanday musobaqada qatnashmayapsiz</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setCurrentPage("musobaqalar")}
              >
                Musobaqalarni ko'rish
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userMusobaqalar.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow">
                      {m.rasm_emoji}
                    </div>
                    <div>
                      <p className="font-semibold">{m.nomi}</p>
                      <p className="text-sm text-slate-500">{m.sana}</p>
                      <Badge
                        className={`mt-1 text-xs ${m.holat === "kelgusi" ? "bg-blue-100 text-blue-700" : m.holat === "faol" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {m.holat === "kelgusi"
                          ? "Kelgusi"
                          : m.holat === "faol"
                            ? "Faol"
                            : "Yakunlangan"}
                      </Badge>
                    </div>
                  </div>
                  {m.holat !== "yakunlangan" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => leaveMusobaqa(m.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
