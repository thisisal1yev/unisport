import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Users, Activity, TrendingUp, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Calendar,
    title: "Aqlli rejalashtirish",
    description: "Universitet ligalari uchun o‘yin jadvalini avtomatik tuzish va muammolarni bartaraf etish."
  },
  {
    icon: Trophy,
    title: "Turnir boshqaruvchiligi",
    description: "Turnirlar uchun bracket yaratish, knockouts boshqarish va real vaqt statistikasini kuzatish."
  },
  {
    icon: Users,
    title: "Jamoalar ro'yhati",
    description: "Jamoalarni boshqarish, talabalar ro'yhatini tasdiqlash va o'yinchilarning mavjudligini kuzatish."
  },
  {
    icon: Activity,
    title: "Real vaqt statistikasi",
    description: "O'yin davrida real vaqt statistikasi va natijalarni kuzatish."
  },
  {
    icon: TrendingUp,
    title: "Yaxshilik statistikasi",
    description: "Jamoalar va o'yinchilar uchun ilg'or metrikalar bilan chuqur tahlil qilish."
  },
  {
    icon: Shield,
    title: "Liga boshqaruvi",
    description: "Ligalar boshqaruvchilari uchun qoidalar va disiplinani boshqarish uchun kuchli vositalar."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-3">Hayotni harakatga keltiring</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6">Sizga kerak bo‘lgan barcha narsa <span className="text-primary">Ligani boshqaring</span></h3>
          <p className="text-muted-foreground text-lg">
            Mahalliy kampus turnirlaridan tortib, universitetlararo chempionatlargacha — Unisport eng yuqori darajada raqobatlashish uchun zarur infratuzilmani taqdim etadi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card hover:bg-accent/5 transition-colors border-border/50 hover:border-primary/50 group">
                <CardContent className="p-8">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-bold uppercase font-display mb-3 group-hover:text-primary transition-colors">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
