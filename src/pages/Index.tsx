import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <div data-section="featured">
        <FeaturedRecipes />
      </div>
      
      {/* AI Generator Teaser */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Créez votre recette personnalisée avec l'IA
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Entrez vos ingrédients favoris et laissez notre intelligence artificielle 
              créer une recette unique rien que pour vous
            </p>
            <div className="bg-white/20 backdrop-blur p-6 rounded-lg border border-white/30 mb-8">
              <div className="text-left text-white/80 text-sm mb-4">
                💡 <strong>Fonctionnalité avancée disponible avec Supabase</strong>
              </div>
              <div className="text-white/70 text-sm">
                Pour utiliser le générateur IA, connectez votre projet à Supabase pour bénéficier de l'authentification, 
                du stockage des recettes et de l'API d'intelligence artificielle.
              </div>
            </div>
            <Link to="/generator">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105">
                Essayer le générateur IA
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Monetization Sections */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Ad Space */}
            <div className="bg-card p-6 rounded-lg border border-border shadow-card">
              <div className="text-center text-muted-foreground">
                <div className="text-sm font-medium mb-2">📢 Espace publicitaire</div>
                <div className="text-xs">Google Ads - 300x250</div>
                <div className="w-full h-32 bg-muted/50 rounded-lg mt-4 flex items-center justify-center">
                  Publicité
                </div>
              </div>
            </div>

            {/* Affiliate */}
            <div className="bg-card p-6 rounded-lg border border-border shadow-card">
              <div className="text-center">
                <h3 className="font-semibold mb-4">🛍️ Nos recommandations</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted/50 rounded">
                    <strong>Ustensiles de cuisine</strong>
                    <div className="text-muted-foreground">Liens d'affiliation Amazon</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <strong>Ingrédients bio</strong>
                    <div className="text-muted-foreground">Partenariats boutiques</div>
                  </div>
                </div>
              </div>
            </div>

            {/* eBooks */}
            <div className="bg-gradient-card p-6 rounded-lg border border-border shadow-card">
              <div className="text-center">
                <h3 className="font-semibold mb-4">📚 Boutique digitale</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-primary/10 rounded">
                    <strong>eBook Cuisine Rapide</strong>
                    <div className="text-primary font-medium">19,99€</div>
                  </div>
                  <div className="p-3 bg-success/10 rounded">
                    <strong>Guide Végétarien</strong>
                    <div className="text-success font-medium">14,99€</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-primary rounded-full"></div>
                <span className="font-bold text-lg">CuisineAI</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Découvrez des milliers de recettes personnalisées générées par intelligence artificielle.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recettes</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Végétariennes</div>
                <div>Desserts</div>
                <div>Rapides</div>
                <div>Healthy</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Outils</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Générateur IA</div>
                <div>Calculateur nutrition</div>
                <div>Liste de courses</div>
                <div>Convertisseur mesures</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Contact</div>
                <div>FAQ</div>
                <div>Conditions</div>
                <div>Confidentialité</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 CuisineAI. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
