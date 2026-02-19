import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Gallery from "@/components/landing/Gallery";
import Footer from "@/components/landing/Footer";
import ChatBot from "@/components/landing/ChatBot";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent/20 z-0" />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-8">
            Afsonani boshlashga tayyormisiz?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90 font-medium">
            Unisport bilan universitet sportini yangi bosqichga olib chiqing.
          </p>
          <button className="bg-white text-primary text-lg font-bold px-10 py-4 rounded-md uppercase tracking-wide hover:bg-accent hover:text-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
            Bugunoq boshlang
          </button>
        </div>
      </section>
      <Footer />
      <ChatBot />
    </div>
  );
}
