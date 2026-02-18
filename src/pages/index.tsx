import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  MapPin,
  Calendar,
  Medal,
  ChevronRight,
  Star,
  ArrowRight,
  Play,
  Target,
  Zap,
  Shield,
  Crown,
  Activity,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  sportTurlari,
  musobaqalar,
  sportchilar,
  klublar,
  yutuqlar,
} from "@/lib/mock-data";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Trophy,
      value: musobaqalar.length,
      label: "Musobaqalar",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Medal,
      value: yutuqlar.length,
      label: "Yutuqlar",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Users,
      value: sportchilar.length,
      label: "Sportchilar",
      color: "from-sky-500 to-blue-600",
    },
    {
      icon: Target,
      value: klublar.length,
      label: "Klublar",
      color: "from-rose-500 to-pink-600",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Tezkor ro'yxatdan o'tish",
      description: "Musobaqalarga bir necha daqiqada ro'yxatdan o'ting",
    },
    {
      icon: Shield,
      title: "Xavfsiz ma'lumotlar",
      description: "Shaxsiy ma'lumotlaringiz himoyalangan",
    },
    {
      icon: Activity,
      title: "Real vaqtda kuzatish",
      description: "Musobaqa natijalarini jonli kuzating",
    },
    {
      icon: TrendingUp,
      title: "Statistika tahlili",
      description: "O'z yutuqlaringizni tahlil qiling",
    },
  ];

  const kelgusiMusobaqalar = musobaqalar.filter((m) => m.holat === "kelgusi");
  const faolMusobaqalar = musobaqalar.filter((m) => m.holat === "faol");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                UniSport
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {[
                "Sport turlari",
                "Musobaqalar",
                "Klublar",
                "Sportchilar",
              ].map((item) => (
                <Link
                  key={item}
                  href={`/sportsman/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth">
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-white/5"
                >
                  Kirish
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 border-0">
                  Ro'yxatdan o'tish
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

{/* Hero Section */}
<section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* LEFT */}
      <div
        className={`space-y-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
          <Star className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-sm font-medium">
            Farg'ona Davlat Texnika Universiteti sport platformasi
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Sport —
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            hayot tarzi
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
          Universitetimizning sport platformasiga xush kelibsiz! Musobaqalarda
          ishtirok eting, yutuqlaringizni kuzating va sport hamjamiyatiga
          qo'shiling.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/sportsman/dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-2xl shadow-emerald-500/30 px-8 h-14 text-base font-semibold group"
            >
              Platformaga kirish
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* RIGHT (TV) */}
      <div
        className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="tv_glow" />

        <div className="main_wrapper">
          <div className="main">
            <div className="antenna">
              <div className="antenna_shadow" />
              <div className="a1" />
              <div className="a1d" />
              <div className="a2" />
              <div className="a2d" />
              <div className="a_base" />
            </div>

            <div className="tv">
              <div className="cruve">
                <svg
                  xmlSpace="preserve"
                  viewBox="0 0 189.929 189.929"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  className="curve_svg"
                >
                  <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13 C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
                </svg>
              </div>

              <div className="display_div">
                <div className="screen_out">
                  <div className="screen_out1">
                    <div className="screen">
                      <img className="tv_img" src="/1.jpg" alt="TV screen" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lines">
                <div className="line1" />
                <div className="line2" />
                <div className="line3" />
              </div>

              <div className="buttons_div">
                <div className="b1">
                  <div />
                </div>
                <div className="b2" />
                <div className="speakers">
                  <div className="g1">
                    <div className="g11" />
                    <div className="g12" />
                    <div className="g13" />
                  </div>
                  <div className="g" />
                  <div className="g" />
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="base1" />
              <div className="base2" />
              <div className="base3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Nima uchun UniSport?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Platformamiz sportchilar uchun barcha imkoniyatlarni taqdim etadi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Sport turlari
              </h2>
              <p className="text-slate-400 max-w-xl">
                12 xil sport turidan birini tanlang va professional bo'ling
              </p>
            </div>
            <Link href="/sportsman/sport-turlari">
              <Button
                variant="ghost"
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 group mt-4 md:mt-0"
              >
                Barchasini ko'rish
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {sportTurlari.slice(0, 12).map((sport, index) => (
              <Link
                key={sport.id}
                href="/sportsman/sport-turlari"
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/30 hover:bg-slate-800 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                      {sport.rasm_emoji}
                    </div>
                    <h3 className="text-sm font-medium text-white truncate">
                      {sport.nomi}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Yaqinlashib kelayotgan musobaqalar
              </h2>
              <p className="text-slate-400 max-w-xl">
                Ishtirok etish uchun ro'yxatdan o'ting
              </p>
            </div>
            <Link href="/sportsman/musobaqalar">
              <Button
                variant="ghost"
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 group mt-4 md:mt-0"
              >
                Barcha musobaqalar
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...faolMusobaqalar, ...kelgusiMusobaqalar]
              .slice(0, 3)
              .map((musobaqa) => (
                <Card
                  key={musobaqa.id}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl group-hover:scale-110 transition-transform">
                        {musobaqa.rasm_emoji}
                      </div>
                      <Badge
                        className={`${
                          musobaqa.holat === "faol"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : musobaqa.holat === "kelgusi"
                              ? "bg-sky-500/20 text-sky-400 border-sky-500/30"
                              : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                        }`}
                      >
                        {musobaqa.holat === "faol"
                          ? "Faol"
                          : musobaqa.holat === "kelgusi"
                            ? "Kelgusi"
                            : "Yakunlangan"}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {musobaqa.nomi}
                    </h3>

                    <div className="space-y-2 text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{musobaqa.sana}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{musobaqa.joy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {musobaqa.ishtirokchilar_soni}/
                          {musobaqa.maksimal_ishtirokchilar} ishtirokchi
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-700/50 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(musobaqa.ishtirokchilar_soni / musobaqa.maksimal_ishtirokchilar) * 100}%`,
                        }}
                      />
                    </div>

                    <Button className="w-full bg-slate-700/50 hover:bg-emerald-500 text-white transition-all duration-300">
                      Ro'yxatdan o'tish
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Top Athletes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Top sportchilar
              </h2>
              <p className="text-slate-400 max-w-xl">
                Eng ko'p yutuqlarga erishgan sportchilarimiz
              </p>
            </div>
            <Link href="/sportsman/sportchilar">
              <Button
                variant="ghost"
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 group mt-4 md:mt-0"
              >
                Barcha sportchilar
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sportchilar
              .sort((a, b) => b.medallar - a.medallar)
              .slice(0, 4)
              .map((sportchi, index) => (
                <Card
                  key={sportchi.id}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden group relative"
                >
                  {index === 0 && (
                    <div className="absolute top-4 right-4">
                      <Crown className="w-6 h-6 text-amber-400" />
                    </div>
                  )}
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition-transform">
                      {sportchi.avatar_emoji}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">
                      {sportchi.ism}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3">
                      {sportchi.sport}
                    </p>

                    <div className="flex items-center justify-center gap-1 mb-3">
                      {Array.from({ length: sportchi.yulduzlar }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        )
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-emerald-400">
                        <Medal className="w-4 h-4" />
                        <span>{sportchi.medallar}</span>
                      </div>
                      <Badge variant="secondary" className="bg-slate-700/50">
                        {sportchi.daraja}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Sport klublari
              </h2>
              <p className="text-slate-400 max-w-xl">
                O'zingizga mos klubni tanlang va a'zo bo'ling
              </p>
            </div>
            <Link href="/sportsman/klublar">
              <Button
                variant="ghost"
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 group mt-4 md:mt-0"
              >
                Barcha klublar
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {klublar.slice(0, 3).map((klub) => (
              <Card
                key={klub.id}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {klub.rasm_emoji}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {klub.nomi}
                      </h3>
                      <p className="text-sm text-slate-400">{klub.sport_turi}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mb-4">{klub.tavsif}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Users className="w-4 h-4" />
                      <span>{klub.azolar_soni} a'zo</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                    >
                      Qo'shilish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 sm:p-12">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 text-center">
              <Trophy className="w-16 h-16 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Sport bilan shug'ullaning, sog'lom bo'ling!
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Hoziroq ro'yxatdan o'ting va universitetimizning sport
                hamjamiyatiga qo'shiling
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-white/90 shadow-xl px-8 h-14 text-base font-semibold"
                  >
                    Ro'yxatdan o'tish
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/sportsman/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 hover:bg-white/20 text-white h-14 px-8 text-base font-semibold"
                  >
                    Platformani ko'rish
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">UniSport</span>
              </div>
              <p className="text-slate-400 max-w-md mb-6">
                Farg'ona Davlat Texnika Universiteti sport platformasi. Barcha sport
                turlari, musobaqalar va yutuqlar bir joyda.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Platformalar</h3>
              <ul className="space-y-3">
                {[
                  { name: "Sport turlari", href: "/sportsman/sport-turlari" },
                  { name: "Musobaqalar", href: "/sportsman/musobaqalar" },
                  { name: "Sportchilar", href: "/sportsman/sportchilar" },
                  { name: "Klublar", href: "/sportsman/klublar" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Aloqa</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Farg'ona shahri, Farg'ona ko'chasi 86</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>sport@fdtu.uz</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+998 73 244 0101</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>&copy; 2026 UniSport. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
        <style jsx global>{`
/* ===== TV (embedded) ===== */

/* === Управление размером ТВ === */
:root {
  --tv-scale: 2;
}

/* Свечение */
.tv_glow {
  position: absolute;
  inset: 0;
  margin: auto;
  width: calc(450px * var(--tv-scale));
  height: calc(300px * var(--tv-scale));
  background: rgba(16, 185, 129, 0.12);
  filter: blur(calc(48px * var(--tv-scale)));
  border-radius: 9999px;
  z-index: 0;
}

/* ОБЁРТКА — масштабируем ВСЁ */
.main_wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30em;
  height: 30em;

  transform: scale(var(--tv-scale));
  transform-origin: center;
}

/* ===== TV (embedded) ===== */

.tv_glow {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 450px;
  height: 300px;
  background: rgba(16, 185, 129, 0.12);
  filter: blur(48px);
  border-radius: 9999px;
  z-index: 0;
}

.main_wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30em;
  height: 30em;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
}

.antenna {
  width: 5em;
  height: 5em;
  border-radius: 50%;
  border: 2px solid black;
  background-color: #f27405;
  margin-bottom: -6em;
  z-index: -1;
  position: relative;
}

.antenna_shadow {
  position: absolute;
  background-color: transparent;
  width: 50px;
  height: 56px;
  margin-left: 1.68em;
  border-radius: 45%;
  transform: rotate(140deg);
  border: 4px solid transparent;
  box-shadow: inset 0px 16px #a85103, inset 0px 16px 1px 1px #a85103;
}

.antenna::after {
  content: "";
  position: absolute;
  margin-top: -9.4em;
  margin-left: 0.4em;
  transform: rotate(-25deg);
  width: 1em;
  height: 0.5em;
  border-radius: 50%;
  background-color: #f69e50;
}

.antenna::before {
  content: "";
  position: absolute;
  margin-top: 0.2em;
  margin-left: 1.25em;
  transform: rotate(-20deg);
  width: 1.5em;
  height: 0.8em;
  border-radius: 50%;
  background-color: #f69e50;
}

.a1 {
  position: relative;
  top: -102%;
  left: -130%;
  width: 12em;
  height: 5.5em;
  border-radius: 50px;
  background-image: linear-gradient(#171717, #171717, #353535, #353535, #171717);
  transform: rotate(-29deg);
  clip-path: polygon(50% 0%, 49% 100%, 52% 100%);
}

.a1d {
  position: relative;
  top: -211%;
  left: -35%;
  transform: rotate(45deg);
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  border: 2px solid black;
  background-color: #979797;
  z-index: 99;
}

.a2 {
  position: relative;
  top: -210%;
  left: -10%;
  width: 12em;
  height: 4em;
  border-radius: 50px;
  background-image: linear-gradient(#171717, #171717, #353535, #353535, #171717);
  margin-right: 5em;
  clip-path: polygon(47% 0, 34% 34%, 54% 25%, 32% 100%, 29% 96%, 49% 32%, 30% 38%);
  transform: rotate(-8deg);
}

.a2d {
  position: relative;
  top: -294%;
  left: 94%;
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  border: 2px solid black;
  background-color: #979797;
  z-index: 99;
}

.tv {
  width: 17em;
  height: 9em;
  margin-top: 3em;
  border-radius: 15px;
  background-color: #d36604;
  display: flex;
  justify-content: center;
  border: 2px solid #1d0e01;
  box-shadow: inset 0.2em 0.2em #e69635;
  position: relative;
}

/* текстура корпуса ТВ */
.tv::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 15px;
  background:
    repeating-radial-gradient(#d36604 0 0.0001%, #00000070 0 0.0002%) 50% 0/2500px 2500px,
    repeating-conic-gradient(#d36604 0 0.0001%, #00000070 0 0.0002%) 60% 60%/2500px 2500px;
  background-blend-mode: difference;
  opacity: 0.09;
  pointer-events: none;
}

.curve_svg {
  position: absolute;
  margin-top: 0.25em;
  margin-left: -0.25em;
  height: 12px;
  width: 12px;
}

.display_div {
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 3.5px 3.5px 0px #e69635;
  position: relative;
  z-index: 1;
}

.screen_out1 {
  width: 11em;
  height: 7.75em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.screen {
  width: 13em;
  height: 7.85em;
  border: 2px solid #1d0e01;
  background-color: #ffffff;
  border-radius: 10px;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;
}


.tv_img {
  width: 90%;   
  height: 80%;
  object-fit: cover;
  display: block;
  border-radius: 6px;
}


/* ===== СИЛЬНЫЙ "полупрозрачный шум" поверх картинки ===== */
.screen::after {
  content: "";
  position: absolute;
  inset: -20%;
  pointer-events: none;
  z-index: 5;

  /* шум крупнее => делаем размер "зерна" больше (меньше background-size) */
  background:
    repeating-radial-gradient(
      circle at 30% 20%,
      rgba(255, 255, 255, 0.18) 0 0.6px,
      rgba(0, 0, 0, 0.16) 0.6px 1.2px
    ),
    repeating-conic-gradient(
      from 0deg,
      rgba(255, 255, 255, 0.12) 0 0.6deg,
      rgba(0, 0, 0, 0.12) 0.6deg 1.2deg
    );

  background-size: 90px 90px, 140px 140px;
  background-position: 0 0, 40px 60px;

  /* сила шума */
  opacity: 0.65;

  /* выглядит как стекло/CRT */
  mix-blend-mode: overlay;

  /* лёгкая "дрожь" */
  animation: tvNoiseShift 0.14s infinite steps(2, end);
  filter: contrast(125%) brightness(105%);
}

@keyframes tvNoiseShift {
  0%   { transform: translate(0, 0) rotate(0deg); }
  25%  { transform: translate(-1.5px, 1px) rotate(0.05deg); }
  50%  { transform: translate(1px, -1.5px) rotate(-0.05deg); }
  75%  { transform: translate(-1px, -1px) rotate(0.03deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

/* (опционально) горизонтальные "скан-линии" поверх шума */
.screen::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0,0,0,0.12) 0px,
    rgba(0,0,0,0.12) 1px,
    rgba(0,0,0,0.00) 3px
  );
  opacity: 0.35;
  mix-blend-mode: multiply;
}

.lines {
  display: flex;
  column-gap: 0.1em;
  align-self: flex-end;
  position: relative;
  z-index: 1;
}

.line1, .line3 {
  width: 2px;
  height: 0.5em;
  background-color: black;
  border-radius: 25px 25px 0px 0px;
  margin-top: 0.5em;
}

.line2 {
  width: 2px;
  height: 1em;
  background-color: black;
  border-radius: 25px 25px 0px 0px;
}

.buttons_div {
  width: 4.25em;
  align-self: center;
  height: 8em;
  background-color: #e69635;
  border: 2px solid #1d0e01;
  padding: 0.6em;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 0.75em;
  box-shadow: 3px 3px 0px #e69635;
  position: relative;
  z-index: 1;
  margin-left: 0.6em;
}

.b1, .b2 {
  width: 1.65em;
  height: 1.65em;
  border-radius: 50%;
  background-color: #7f5934;
  border: 2px solid black;
  box-shadow: inset 2px 2px 1px #b49577, -2px 0px #513721, -2px 0px 0px 1px black;
  position: relative;
}

.b1 div {
  position: absolute;
  top: 0.05em;
  left: 0.72em;
  transform: rotate(45deg);
  width: 0.15em;
  height: 1.5em;
  background-color: #000;
}

.speakers {
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;
}

.speakers .g1 {
  display: flex;
  column-gap: 0.25em;
}

.g11, .g12, .g13 {
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  background-color: #7f5934;
  border: 2px solid black;
  box-shadow: inset 1.25px 1.25px 1px #b49577;
}

.speakers .g {
  height: 2px;
  background-color: #171717;
}

.bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8.7em;
  position: relative;
}

.base1, .base2 {
  height: 1em;
  width: 2em;
  border: 2px solid #171717;
  background-color: #4d4d4d;
  margin-top: -0.15em;
  z-index: -1;
}

.base3 {
  position: absolute;
  height: 0.15em;
  width: 17.5em;
  background-color: #171717;
  margin-top: 0.8em;
}
`}</style>

      </footer>
    </div>
  );
}
