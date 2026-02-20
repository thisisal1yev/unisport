"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/lib/store";
import { AVATAR_EMOJIS, FAKULTETLAR, GURUHLAR } from "@/lib/constants";
import {
  Calendar,
  GraduationCap,
  Lock,
  Mail,
  Phone,
  Ruler,
  Scale,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const {
    register,
    login,
    setCurrentPage,
    sportTurlari: sportTypes,
    isAuthenticated,
  } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to profile once auth state is confirmed
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage("profil");
    }
  }, [isAuthenticated, setCurrentPage]);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regData, setRegData] = useState({
    ism: "",
    familiya: "",
    email: "",
    parol: "",
    confirmParol: "",
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!loginEmail || !loginPassword) {
      setError("Barcha maydonlarni to'ldiring");
      return;
    }

    setIsSubmitting(true);
    const result = await login(loginEmail, loginPassword);
    setIsSubmitting(false);

    if (result.success) {
      setSuccess("Muvaffaqiyatli kirdingiz!");
      // redirect handled by useEffect watching isAuthenticated
    } else {
      setError(result.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!regData.ism || !regData.familiya || !regData.email || !regData.parol) {
      setError("Ism, familiya, email va parol majburiy maydonlar");
      return;
    }

    if (regData.parol !== regData.confirmParol) {
      setError("Parollar mos kelmayapti");
      return;
    }

    if (regData.parol.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      ism: regData.ism,
      familiya: regData.familiya,
      email: regData.email,
      parol: regData.parol,
      telefon: regData.telefon || undefined,
      tug_sana: regData.tug_sana || undefined,
      fakultet: regData.fakultet || undefined,
      guruh: regData.guruh || undefined,
      vazn: regData.vazn ? Number.parseFloat(regData.vazn) : undefined,
      boy: regData.boy ? Number.parseFloat(regData.boy) : undefined,
      avatar_emoji: regData.avatar_emoji,
      bio: regData.bio || undefined,
      sport_turlari: regData.sport_turlari,
    });
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(
        "Ro'yxatdan o'tish muvaffaqiyatli! Emailingizga tasdiqlash xabari yuborilgan bo'lsa, uni tasdiqlang.",
      );
      // redirect handled by useEffect if auto-confirmed, otherwise user sees message
    } else {
      setError(result.message);
    }
  };

  const toggleSport = (sport: string) => {
    setRegData((prev) => ({
      ...prev,
      sport_turlari: prev.sport_turlari.includes(sport)
        ? prev.sport_turlari.filter((s) => s !== sport)
        : [...prev.sport_turlari, sport],
    }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-8">
      <Card className="w-full max-w-lg border-0 shadow-2xl bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            UniSport
          </CardTitle>
          <CardDescription className="text-base">
            {isLogin ? "Hisobingizga kiring" : "Yangi hisob yarating"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Tab buttons */}
          <div className="flex gap-2 mb-6">
            <Button
              type="button"
              variant={isLogin ? "default" : "outline"}
              className={`flex-1 ${isLogin ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
              onClick={() => {
                setIsLogin(true);
                setError("");
                setSuccess("");
              }}
            >
              Kirish
            </Button>
            <Button
              type="button"
              variant={!isLogin ? "default" : "outline"}
              className={`flex-1 ${!isLogin ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
              onClick={() => {
                setIsLogin(false);
                setError("");
                setSuccess("");
              }}
            >
              Ro'yxatdan o'tish
            </Button>
          </div>

          {/* Error/Success messages */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm">
              {success}
            </div>
          )}

          {isLogin ? (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="pl-11 h-12"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  placeholder="Parol"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="pl-11 h-12"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-lg font-semibold"
              >
                {isSubmitting ? "Kirish..." : "Kirish"}
              </Button>
            </form>
          ) : (
            // Register Form
            <form
              onSubmit={handleRegister}
              className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
            >
              {/* Avatar selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Avatar tanlang
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_EMOJIS.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() =>
                        setRegData((prev) => ({ ...prev, avatar_emoji: emoji }))
                      }
                      className={`w-10 h-10 text-xl rounded-lg transition-all ${
                        regData.avatar_emoji === emoji
                          ? "bg-emerald-100 dark:bg-emerald-900 ring-2 ring-emerald-500"
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Ism *"
                    value={regData.ism}
                    onChange={(e) =>
                      setRegData((prev) => ({ ...prev, ism: e.target.value }))
                    }
                    className="pl-11 h-12"
                  />
                </div>
                <Input
                  placeholder="Familiya *"
                  value={regData.familiya}
                  onChange={(e) =>
                    setRegData((prev) => ({
                      ...prev,
                      familiya: e.target.value,
                    }))
                  }
                  className="h-12"
                />
              </div>

              {/* Email & Password */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  placeholder="Email *"
                  value={regData.email}
                  onChange={(e) =>
                    setRegData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="pl-11 h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="Parol *"
                    value={regData.parol}
                    onChange={(e) =>
                      setRegData((prev) => ({ ...prev, parol: e.target.value }))
                    }
                    className="pl-11 h-12"
                  />
                </div>
                <Input
                  type="password"
                  placeholder="Parolni tasdiqlang *"
                  value={regData.confirmParol}
                  onChange={(e) =>
                    setRegData((prev) => ({
                      ...prev,
                      confirmParol: e.target.value,
                    }))
                  }
                  className="h-12"
                />
              </div>

              {/* Phone & Birthday */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Telefon"
                    value={regData.telefon}
                    onChange={(e) =>
                      setRegData((prev) => ({
                        ...prev,
                        telefon: e.target.value,
                      }))
                    }
                    className="pl-11 h-12"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="date"
                    placeholder="Tug'ilgan sana"
                    value={regData.tug_sana}
                    onChange={(e) =>
                      setRegData((prev) => ({
                        ...prev,
                        tug_sana: e.target.value,
                      }))
                    }
                    className="pl-11 h-12"
                  />
                </div>
              </div>

              {/* Faculty & Group */}
              <div className="grid grid-cols-2 gap-3">
                <Select
                  value={regData.fakultet}
                  onValueChange={(value) =>
                    setRegData((prev) => ({ ...prev, fakultet: value }))
                  }
                >
                  <SelectTrigger className="h-12">
                    <GraduationCap className="w-5 h-5 text-slate-400 mr-2" />
                    <SelectValue placeholder="Fakultet" />
                  </SelectTrigger>
                  <SelectContent>
                    {FAKULTETLAR.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={regData.guruh}
                  onValueChange={(value) =>
                    setRegData((prev) => ({ ...prev, guruh: value }))
                  }
                >
                  <SelectTrigger className="h-12">
                    <Users className="w-5 h-5 text-slate-400 mr-2" />
                    <SelectValue placeholder="Guruh" />
                  </SelectTrigger>
                  <SelectContent>
                    {GURUHLAR.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Weight & Height */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="number"
                    placeholder="Vazn (kg)"
                    value={regData.vazn}
                    onChange={(e) =>
                      setRegData((prev) => ({ ...prev, vazn: e.target.value }))
                    }
                    className="pl-11 h-12"
                  />
                </div>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="number"
                    placeholder="Bo'y (cm)"
                    value={regData.boy}
                    onChange={(e) =>
                      setRegData((prev) => ({ ...prev, boy: e.target.value }))
                    }
                    className="pl-11 h-12"
                  />
                </div>
              </div>

              {/* Sports selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Sport turlari
                </label>
                <div className="flex flex-wrap gap-2">
                  {sportTypes.slice(0, 8).map((sport) => (
                    <button
                      type="button"
                      key={sport.id}
                      onClick={() => toggleSport(sport.nomi)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                        regData.sport_turlari.includes(sport.nomi)
                          ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {sport.rasm_emoji} {sport.nomi}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <Input
                  placeholder="O'zingiz haqingizda qisqacha..."
                  value={regData.bio}
                  onChange={(e) =>
                    setRegData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-lg font-semibold"
              >
                {isSubmitting ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
