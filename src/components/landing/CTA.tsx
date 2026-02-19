"use client";

import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <Trophy className="cta-icon" />
          <h2 className="cta-title">Sport bilan shug'ullaning, sog'lom bo'ling!</h2>
          <p className="cta-desc">
            Hoziroq ro'yxatdan o'ting va universitetimizning sport
            hamjamiyatiga qo'shiling
          </p>
          <div className="cta-actions">
            <Link href="/auth">
              <Button size="lg" className="cta-primary-btn">
                Ro'yxatdan o'tish
                <ArrowRight className="cta-arrow" />
              </Button>
            </Link>
            <Link href="/sportsman/dashboard">
              <Button size="lg" variant="outline" className="cta-secondary-btn">
                Platformani ko'rish
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
