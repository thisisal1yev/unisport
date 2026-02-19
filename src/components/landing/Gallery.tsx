import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const images = [
  {
    src: "/images/feature-basketball.png",
    category: "Basketbol",
    title: "Dekan Kubogi"
  },
  {
    src: "/images/feature-tennis.png",
    category: "Tenis",
    title: "Bahorgi Ochiq Turnir"
  },
  {
    src: "/images/feature-trophy.png",
    category: "Taqdirlash",
    title: "Rektor Kubogi"
  }
];

export default function Gallery() {
  return (
    <section id="tournaments" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-3">Jarayondagi musobaqalar</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold uppercase">Afsonalar <br/>Yaratiladigan joy</h3>
          </div>
          <Button variant="outline" className="hidden md:flex">
            Barcha musobaqalarni ko‘rish
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px] md:h-[400px]">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              className="relative group overflow-hidden rounded-2xl cursor-pointer h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
              <img 
                src={img.src} 
                alt={img.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{img.category}</span>
                <h4 className="text-2xl font-display font-bold text-white uppercase">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden">
          <Button variant="outline" className="w-full">
            Barcha musobaqalarni ko‘rish
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
