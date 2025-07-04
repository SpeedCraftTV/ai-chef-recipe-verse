import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus, X } from "lucide-react";

const AIGenerator = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [preferences, setPreferences] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const generateRecipe = () => {
    setIsGenerating(true);
    // Simulation - en réalité, cela nécessiterait Supabase et une API IA
    setTimeout(() => {
      setIsGenerating(false);
      // Ici on montrerait la recette générée
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-medium text-primary">Générateur IA</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Créez votre recette personnalisée
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Entrez vos ingrédients disponibles et vos préférences. Notre IA créera une recette unique pour vous.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Mes ingrédients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Ajout ingrédients */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: tomates, basilic, mozzarella..."
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={addIngredient} disabled={!currentIngredient.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Liste des ingrédients */}
              <div className="flex flex-wrap gap-2 min-h-[60px]">
                {ingredients.map((ingredient) => (
                  <Badge 
                    key={ingredient} 
                    variant="secondary" 
                    className="px-3 py-1 cursor-pointer hover:bg-destructive/20 transition-colors"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    {ingredient}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {ingredients.length === 0 && (
                  <p className="text-muted-foreground text-sm py-4">
                    Ajoutez des ingrédients pour commencer...
                  </p>
                )}
              </div>
            </div>

            {/* Préférences */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Préférences (optionnel)</label>
              <Textarea
                placeholder="Ex: végétarien, sans gluten, cuisine italienne, temps de préparation 30min max..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={4}
              />
            </div>

            {/* Bouton génération */}
            <Button 
              onClick={generateRecipe}
              disabled={ingredients.length === 0 || isGenerating}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Générer ma recette
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Aperçu/Résultat */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Votre recette générée</CardTitle>
          </CardHeader>
          <CardContent>
            {!isGenerating && ingredients.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Ajoutez des ingrédients pour voir la magie opérer !</p>
              </div>
            ) : isGenerating ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">L'IA analyse vos ingrédients...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-primary font-medium mb-2">💡 Fonctionnalité Pro</div>
                  <p className="text-sm text-muted-foreground">
                    La génération automatique de recettes nécessite une connexion à Supabase pour 
                    utiliser les API d'intelligence artificielle. 
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Connecter Supabase
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <strong>Vos ingrédients :</strong> {ingredients.join(", ")}
                  {preferences && (
                    <>
                      <br />
                      <strong>Préférences :</strong> {preferences}
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIGenerator;