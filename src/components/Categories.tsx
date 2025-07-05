import { Button } from "@/components/ui/button";
import { Leaf, Clock, Heart, Coffee, Fish, Cake } from "lucide-react";

const categories = [
  {
    name: "Végétarien",
    icon: Leaf,
    color: "bg-success/10 hover:bg-success/20 text-success border-success/20",
    count: "124 recettes"
  },
  {
    name: "Rapide",
    icon: Clock,
    color: "bg-primary/10 hover:bg-primary/20 text-primary border-primary/20",
    count: "89 recettes"
  },
  {
    name: "Desserts",
    icon: Cake,
    color: "bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 border-pink-500/20",
    count: "156 recettes"
  },
  {
    name: "Healthy",
    icon: Heart,
    color: "bg-red-500/10 hover:bg-red-500/20 text-red-600 border-red-500/20",
    count: "203 recettes"
  },
  {
    name: "Petit-déjeuner",
    icon: Coffee,
    color: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 border-amber-500/20",
    count: "67 recettes"
  },
  {
    name: "Poissons",
    icon: Fish,
    color: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 border-blue-500/20",
    count: "78 recettes"
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Explorez par catégorie
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement des recettes adaptées à vos goûts et besoins alimentaires
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant="outline"
                className={`h-auto p-6 flex flex-col items-center gap-3 hover:scale-105 transition-all duration-200 ${category.color}`}
                onClick={() => alert(`Catégorie ${category.name} - Fonctionnalité de filtrage bientôt disponible !`)}
              >
                <Icon className="w-8 h-8" />
                <div className="text-center">
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-xs opacity-70 mt-1">{category.count}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;