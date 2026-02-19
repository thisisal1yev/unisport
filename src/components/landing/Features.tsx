"use client";

import { Zap, Shield, Activity, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Features() {
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

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Nima uchun UniSport?</h2>
          <p className="features-subtitle">
            Platformamiz sportchilar uchun barcha imkoniyatlarni taqdim etadi
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <Card key={feature.title} className="features-card">
              <CardContent className="features-card-content">
                <div className="features-icon-wrapper">
                  <feature.icon className="features-icon" />
                </div>
                <h3 className="features-card-title">{feature.title}</h3>
                <p className="features-card-desc">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
