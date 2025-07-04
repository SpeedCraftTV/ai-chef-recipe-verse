import { Clock, Users, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RecipeCardProps {
  title: string;
  image: string;
  cookTime: string;
  servings: number;
  rating: number;
  difficulty: "Facile" | "Moyen" | "Difficile";
  category: string;
  isNew?: boolean;
}

const RecipeCard = ({ 
  title, 
  image, 
  cookTime, 
  servings, 
  rating, 
  difficulty, 
  category,
  isNew = false 
}: RecipeCardProps) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Facile": return "text-success";
      case "Moyen": return "text-primary";
      case "Difficile": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              Nouveau
            </span>
          )}
          <span className="bg-background/90 backdrop-blur text-foreground text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Favorite Button */}
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur hover:bg-background/90 p-2"
        >
          <Heart className="w-4 h-4" />
        </Button>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{servings} pers.</span>
          </div>
          <span className={`font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>

        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          Voir la recette
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;