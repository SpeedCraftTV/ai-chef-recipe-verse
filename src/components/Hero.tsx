import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-kitchen.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Cuisine moderne avec ingrédients frais"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center lg:text-left">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Générateur de recettes IA
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in">
            Créez des recettes
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              uniques avec l'IA
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Découvrez des milliers de recettes personnalisées générées par intelligence artificielle. 
            Entrez vos ingrédients et laissez la magie opérer !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Link to="/generator">
              <Button size="lg" variant="hero" className="text-lg px-8 py-4">
                Générer une recette
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4" onClick={() => {
              const recipesSection = document.querySelector('[data-section="featured"]');
              recipesSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Découvrir les recettes
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-primary/30 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-success/40 rounded-full animate-float hidden lg:block" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-12 w-2 h-2 bg-accent/50 rounded-full animate-float hidden lg:block" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default Hero;