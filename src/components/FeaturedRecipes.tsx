import RecipeCard from "./RecipeCard";
import pastaImage from "@/assets/pasta-dish.jpg";
import saladImage from "@/assets/salad-bowl.jpg";
import dessertImage from "@/assets/chocolate-dessert.jpg";

const featuredRecipes = [
  {
    title: "Pasta aux tomates cerises et basilic frais",
    image: pastaImage,
    cookTime: "25 min",
    servings: 4,
    rating: 4.8,
    difficulty: "Facile" as const,
    category: "Italien",
    isNew: true
  },
  {
    title: "Salade quinoa avocat aux légumes croquants",
    image: saladImage,
    cookTime: "15 min",
    servings: 2,
    rating: 4.6,
    difficulty: "Facile" as const,
    category: "Healthy"
  },
  {
    title: "Dessert chocolat aux fruits rouges",
    image: dessertImage,
    cookTime: "45 min",
    servings: 6,
    rating: 4.9,
    difficulty: "Moyen" as const,
    category: "Dessert",
    isNew: true
  },
  {
    title: "Risotto aux champignons et parmesan",
    image: pastaImage,
    cookTime: "35 min",
    servings: 4,
    rating: 4.7,
    difficulty: "Moyen" as const,
    category: "Italien"
  },
  {
    title: "Bowl de légumes grillés et tahini",
    image: saladImage,
    cookTime: "30 min",
    servings: 2,
    rating: 4.5,
    difficulty: "Facile" as const,
    category: "Végétarien"
  },
  {
    title: "Tiramisu revisité aux fruits exotiques",
    image: dessertImage,
    cookTime: "20 min",
    servings: 8,
    rating: 4.8,
    difficulty: "Difficile" as const,
    category: "Dessert"
  }
];

const FeaturedRecipes = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Recettes populaires
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos recettes les plus appréciées par la communauté
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe, index) => (
            <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <RecipeCard {...recipe} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-primary hover:shadow-glow text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
            Voir toutes les recettes
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;