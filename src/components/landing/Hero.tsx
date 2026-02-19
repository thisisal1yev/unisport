import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <img 
          src="/images/hero-sports.png" 
          alt="Sports Action" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-primary font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-12 h-0.5 bg-primary block"></span>
              Universitet sport musobaqalarining kelajagi
            </h2>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-6 font-display italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Elevate <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Your Game</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Eng zo‘r universitet sport musobaqasiga qo‘shiling. Jamoalarni boshqaring, statistikani kuzating va real vaqt rejimida shon-shuhrat uchun raqobatlashing.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" className="h-14 px-8 text-lg uppercase tracking-wide font-bold skew-x-[-10deg] hover:skew-x-0 transition-transform">
              <span className="skew-x-[10deg]">Start Your Journey</span>
              <ArrowRight className="ml-2 w-5 h-5 skew-x-[10deg]" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Ticker at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary/10 border-t border-primary/20 py-4 overflow-hidden z-20 backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-sm font-bold uppercase tracking-widest text-primary">
          <span>🏀 Basketbol finali: ICHB vs ATT • 14:00</span>
          <span>⚽ Futbol: KT Dekan Kubogi jadvalida yetakchilik qilmoqda</span>
          <span>🏆 Dekan kubogining yengil atletika yunalishi uchun ro‘yxatdan o‘tish tez orada yakunlanadi</span>
          <span>🎾 Badminton ochiq turnir: Yarim final shu hafta oxirida</span>
          <span>🏀 Basketbol finali: ICHB vs ATT • 19:00</span>
          <span>⚽ Futbol: KT Dekan Kubogi jadvalida yetakchilik qilmoqda</span>
          <span>🏆 Dekan kubogining yengil atletika yunalishi uchun ro‘yxatdan o‘tish tez orada yakunlanadi</span>
          <span>🎾 Badminton ochiq turnir: Yarim final shu hafta oxirida</span>
        </div>
      </div>
    </div>
  );
}
