"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  const handlePlatformAccess = () => {
    if (currentUser) {
      switch (currentUser.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "coach":
          router.push("/coach/dashboard");
          break;
        case "sportsman":
          router.push("/sportsman/dashboard");
          break;
        default:
          router.push("/auth");
      }
    } else {
      router.push("/auth");
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-bg-elements">
        <div className="hero-bg-element hero-bg-1" />
        <div className="hero-bg-element hero-bg-2" />
        <div className="hero-bg-element hero-bg-3" />
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* LEFT */}
          <div className={`hero-content ${isVisible ? "hero-visible" : "hero-hidden"}`}>
            <div className="hero-badge">
              <Star className="hero-badge-icon" />
              <span className="hero-badge-text">
                Farg'ona Davlat Texnika Universiteti sport platformasi
              </span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-main">Sport —</span>
              <br />
              <span className="hero-title-accent">hayot tarzi</span>
            </h1>

            <p className="hero-description">
              Universitetimizning sport platformasiga xush kelibsiz! Musobaqalarda
              ishtirok eting, yutuqlaringizni kuzating va sport hamjamiyatiga
              qo'shiling.
            </p>

            <div className="hero-actions">
              <Button
                size="lg"
                onClick={handlePlatformAccess}
                className="hero-cta-btn"
              >
                Platformaga kirish
                <ArrowRight className="hero-cta-icon" />
              </Button>
            </div>
          </div>

          {/* RIGHT (TV) */}
          <div className={`hero-tv-wrapper ${isVisible ? "hero-visible" : "hero-hidden"}`}>
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
  );
}
