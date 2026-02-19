"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export function Navbar({ onLoginClick, onRegisterClick }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="navbar-logo">
              <Trophy className="navbar-logo-icon" />
            </div>
            <span className="navbar-title">UniSport</span>
          </div>
          <div className="navbar-links">
            {[
              { name: "Sport turlari", href: "#sport-turlari" },
              { name: "Musobaqalar", href: "#musobaqalar" },
              { name: "Klublar", href: "#klublar" },
              { name: "Sportchilar", href: "#sportchilar" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="navbar-link"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="navbar-actions">
            <Link href="/auth">
              <Button
                variant="ghost"
                className="navbar-login-btn"
              >
                Kirish
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="navbar-register-btn">
                Ro'yxatdan o'tish
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
