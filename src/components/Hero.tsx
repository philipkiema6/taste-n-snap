import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-food.jpg";

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero = ({ onOrderClick }: HeroProps) => {
  return (
    <section id="home" className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Delicious food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Delicious Food,
            <br />
            <span className="text-transparent bg-clip-text gradient-hero">
              Delivered Fast
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl">
            Experience the finest cuisine delivered right to your doorstep. Fresh ingredients, expertly crafted dishes, and lightning-fast delivery.
          </p>
          <Button
            variant="hero"
            onClick={onOrderClick}
            className="animate-scale-up"
          >
            Order Now
          </Button>
        </div>
      </div>
    </section>
  );
};
