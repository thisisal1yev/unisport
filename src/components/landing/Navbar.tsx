import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy, Menu, UserCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isAuthenticated } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!currentUser) return "/auth";
    if (currentUser.isAdmin) return "/admin/dashboard";
    if (currentUser.role === "coach") return "/coach/dashboard";
    return "/sportsman/dashboard";
  };

  const NavLinks = () => (
    <>
      <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Xususiyatlar</a>
      <a href="#tournaments" className="text-sm font-medium hover:text-primary transition-colors">Musobaqalar</a>
    </>
  );

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
      scrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="text-2xl font-display font-bold tracking-tighter uppercase">Unisport</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && currentUser ? (
            <Link href={getDashboardLink()}>
              <Button variant="ghost" size="sm" className="font-semibold flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="ghost" size="sm" className="font-semibold">Log In</Button>
              </Link>
              <Link href="/auth">
                <Button size="sm" className="font-semibold uppercase tracking-wide">
                  Join Now
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                <NavLinks />
                {isAuthenticated && currentUser ? (
                  <Link href={getDashboardLink()}>
                    <Button className="w-full flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-4 mt-4">
                    <Link href="/auth">
                      <Button variant="outline" className="w-full">Log In</Button>
                    </Link>
                    <Link href="/auth">
                      <Button className="w-full">Join Now</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
