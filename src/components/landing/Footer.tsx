import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-display font-bold uppercase mb-6">Unisport</h2>
            <p className="text-muted-foreground max-w-sm mb-8">
              Universitet sportini boshqarish uchun to‘liq ekotizim. Administratorlar, sportchilar va murabbiylar uchun o‘yinni yangi bosqichga olib chiqadi.
            </p>
            <div className="flex gap-4">
              <Button>Get Started</Button>x
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase mb-6">Platform</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookies Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase mb-6">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2026 Unisport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
