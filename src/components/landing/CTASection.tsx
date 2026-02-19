"use client";

import Link from "next/link";
import { MapPin, Trophy } from "lucide-react";

export function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-bg-noise" />
          <div className="cta-bg-glow" />

          <div className="cta-inner">
            <Trophy className="cta-icon" />
            <h2 className="cta-title">
              Sport bilan shug'ullaning, sog'lom bo'ling!
            </h2>
            <p className="cta-description">
              Hoziroq ro'yxatdan o'ting va universitetimizning sport
              hamjamiyatiga qo'shiling
            </p>
            <div className="cta-actions">
              <Link href="/auth" className="cta-primary-btn">
                Ro'yxatdan o'tish
              </Link>
              <Link href="/sportsman/dashboard" className="cta-secondary-btn">
                Platformani ko'rish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
